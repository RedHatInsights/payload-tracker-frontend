import * as ActionTypes from '../../actions';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocalDate } from '../../utilities/Common';

const TrackTable = ({ payloads, cells, sortBy, sortDir, setTrackSortBy, setTrackSortDir }) => {

    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const truncate = (value) => value.length > 12 ? `${value.substring(0, 12)}...` : value;

    const generateCells = (cells) => cells.filter(cell => cell.isActive);

    const generateRows = (payloads, cells) => {
        return payloads.map(payload => {
            return cells.map(cell => {
                const value = payload?.[cell.title];
                if (value) {
                    if (cell.isDate) {
                        return {
                            title: getLocalDate(
                                DateTime.fromFormat(
                                    value, 'yyyy-MM-dd H:mm:ss.uZZ'
                                ).toJSDate()
                            )
                        };
                    } else {
                        return { title: truncate(value) };
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
    payloads: PropTypes.array,
    cells: PropTypes.array,
    sortBy: PropTypes.string,
    sortDir: PropTypes.string,
    setTrackSortBy: PropTypes.func,
    setTrackSortDir: PropTypes.func
};

export default connect((state) => ({
    payloads: state.data.payloads,
    cells: state.cell.cells,
    sortBy: state.track.sort_by,
    sortDir: state.track.sort_dir
}), (dispatch) => ({
    setTrackSortBy: (title) => dispatch(ActionTypes.setTrackSortBy(title)),
    setTrackSortDir: (dir) => dispatch(ActionTypes.setTrackSortDir(dir))
}))(TrackTable);
