import * as ActionTypes from '../../actions';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';
import { getLocalDate, truncateString } from '../../utilities/Common';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TrackTable = ({ payloads, cells, sortBy, sortDir, setTrackSortBy, setTrackSortDir }) => {

    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

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

    const onSort = (_event, title, direction) => {
        setTrackSortBy(title);
        setTrackSortDir(direction);
    };

    useEffect(() => {
        const cols = generateCells(cells);
        setCols(cols);
        setRows(generateRows(payloads, cols));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payloads, cells]);

    return <Table
        cells={cols}
        rows={rows}
        variant={TableVariant.compact}
        sortBy={{
            index: cols.findIndex(x => x.title === sortBy),
            direction: sortDir
        }}
        onSort={(e, index, direction) => onSort(e, cols[index].title, direction)}
    >
        <TableHeader/>
        <TableBody/>
    </Table>;
};

TrackTable.propTypes = {
    payloads: PropTypes.array.isRequired,
    cells: PropTypes.array,
    sortBy: PropTypes.string,
    sortDir: PropTypes.string,
    setTrackSortBy: PropTypes.func,
    setTrackSortDir: PropTypes.func
};

export default connect((state) => ({
    cells: state.cell.cells,
    sortBy: state.track.sort_by,
    sortDir: state.track.sort_dir
}), (dispatch) => ({
    setTrackSortBy: (title) => dispatch(ActionTypes.setTrackSortBy(title)),
    setTrackSortDir: (dir) => dispatch(ActionTypes.setTrackSortDir(dir))
}))(TrackTable);
