import * as ActionTypes from '../../actions';

import React, { useEffect, useState } from 'react';
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@patternfly/react-table';
import { getLocalDate, truncateString } from '../../utilities/Common';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const TrackTable = ({ payloads }) => {
    const cells = useSelector(state => state.cell.cells, shallowEqual);
    const sortBy = useSelector(state => state.track.sort_by);
    const sortDir = useSelector(state => state.track.sort_dir);
    const dispatch = useDispatch();

    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);
    const [activeSortIndex, setActiveSortIndex] = useState(null);
    const [activeSortDirection, setActiveSortDirection] = useState('asc');

    const generateCells = (cells) => cells.filter(cell => cell.isActive);

    const generateRows = (payloads, cells) => {
        return payloads.map(payload => {
            return cells.map(cell => {
                const value = payload?.[cell.title];
                if (value) {
                    if (cell.isDate) {
                        return {
                            title: getLocalDate(
                                DateTime.fromISO(
                                    value
                                ).toJSDate()
                            )
                        };
                    } else {
                        return { title: truncateString(value, 12) };
                    }
                } else {
                    return {};
                }
            });
        });
    };

    useEffect(() => {
        const cols = generateCells(cells);
        setCols(cols);
        setRows(generateRows(payloads, cols));

        if (sortBy && cols) {
            const index = cols.findIndex(col => col.title === sortBy);
            setActiveSortIndex(index);
            setActiveSortDirection(sortDir || 'asc');
        }
    }, [payloads, cells, sortBy, sortDir]);

    const getSortParams = (columnIndex) => ({
        sortBy: {
            index: activeSortIndex,
            direction: activeSortDirection
        },
        onSort: (_event, index, direction) => {
            setActiveSortIndex(index);
            setActiveSortDirection(direction);
            if (cols && cols[index]) {
                dispatch(ActionTypes.setTrackSortBy(cols[index].title));
                dispatch(ActionTypes.setTrackSortDir(direction));
            }
        },
        columnIndex
    });

    return (
        <Table variant='compact'>
            <Thead>
                <Tr>
                    {cols.map((col, index) => (
                        <Th key={index} sort={getSortParams(index)}>
                            {col.title}
                        </Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {rows.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <Td key={cellIndex}>{cell.title || ''}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

TrackTable.propTypes = {
    payloads: PropTypes.array.isRequired
};

export default TrackTable;
