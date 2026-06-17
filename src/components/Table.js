import {
    Bullseye,
    EmptyState,
    EmptyStateBody,
    Spinner,
    Title
} from '@patternfly/react-core';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@patternfly/react-table';

import DateTime from 'luxon/src/datetime';
import HoverableAttribute from './HoverableAttribute';
import PropTypes from 'prop-types';
import { SearchIcon } from '@patternfly/react-icons';
import { shallowEqual, useSelector } from 'react-redux';
import { getLocalDate } from '../utilities/Common';

const PayloadsTable = ({ sortDir, setSortDir, sortBy, setSortBy }) => {
    const payloads = useSelector(state => state.data.payloads, shallowEqual);
    const cells = useSelector(state => state.cell.cells, shallowEqual);
    const loading = useSelector(state => state.data.loading);

    const [formattedRows, setFormattedRows] = useState();
    const [formattedCells, setFormattedCells] = useState();

    const generateCells = (cells) => cells.filter(cell => cell.isActive);

    const generateRows = (payloads, cells) => {
        return payloads?.map(payload => {
            return cells?.map(cell => {
                const value = payload?.[cell.title];
                if (value) {
                    if (cell.isFilterable) {
                        return {
                            title: <HoverableAttribute
                                type='filter'
                                value={value}
                                filter={cell.title}
                            />,
                            props: {
                                component: 'th'
                            }
                        };
                    } else if (cell.isTrackable) {
                        return {
                            title: <HoverableAttribute
                                type='track'
                                value={value}
                                filter={cell.title}
                            />,
                            props: {
                                component: 'th'
                            }
                        };
                    } else if (cell.isDate) {
                        return {
                            title: getLocalDate(
                                DateTime.fromISO(
                                    value
                                ).toJSDate()
                            )
                        };
                    } else {
                        return { title: value };
                    }
                } else {
                    return {};
                }
            });
        });
    };

    useEffect(() => {
        const cols = generateCells(cells);
        setFormattedCells(cols);
        setFormattedRows(generateRows(payloads, cols));
    }, [cells, payloads]);

    const activeSortIndex = useMemo(() => {
        if (sortBy && formattedCells) {
            return formattedCells.findIndex(col => col.title === sortBy);
        }

        return null;
    }, [sortBy, formattedCells]);

    const getSortParams = (columnIndex) => ({
        sortBy: {
            index: activeSortIndex,
            direction: sortDir || 'asc'
        },
        onSort: (_event, index, direction) => {
            if (formattedCells && formattedCells[index]) {
                setSortBy(formattedCells[index].title);
                setSortDir(direction);
            }
        },
        columnIndex
    });

    return <div>
        {loading && <Bullseye><Spinner size='xl'/></Bullseye>}
        {!loading && formattedCells && formattedRows && (!payloads || payloads.length === 0) && <Bullseye>
            <EmptyState icon={SearchIcon}>
                <Title headingLevel="h4" size="lg">
                    No results found
                </Title>
                <EmptyStateBody>
                    No results match the filter criteria. Clear filters to show results.
                </EmptyStateBody>
            </EmptyState>
        </Bullseye>}
        {!loading && formattedCells && formattedRows && payloads && payloads.length > 0 && (
            <Table variant='compact'>
                <Thead>
                    <Tr>
                        {formattedCells.map((cell, index) => (
                            <Th
                                key={index}
                                sort={getSortParams(index)}
                            >
                                {cell.title}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {formattedRows.map((row, rowIndex) => (
                        <Tr key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                const isHeaderCell = cell.props?.component === 'th';
                                const CellComponent = isHeaderCell ? Th : Td;
                                return (
                                    <CellComponent key={cellIndex}>
                                        {cell.title || ''}
                                    </CellComponent>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        )}
    </div>;
};

PayloadsTable.propTypes = {
    sortDir: PropTypes.string,
    setSortDir: PropTypes.func,
    sortBy: PropTypes.string,
    setSortBy: PropTypes.func
};

export default PayloadsTable;
