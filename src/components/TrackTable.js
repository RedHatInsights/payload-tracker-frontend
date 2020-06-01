import * as AppActions from '../actions';

import {
    Table,
    TableBody,
    TableHeader,
    TableVariant
} from '@patternfly/react-table';

import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const generateRows = (payloads, cells) => {
    var rows = [];
    if (payloads) {
        Object.values(payloads).forEach(payload => {
            var row = [];
            Object.entries(cells).forEach(([cellKey, cellValue]) => {
                var valueWasFound = false;
                if (cellValue.isActive) {
                    Object.entries(payload).forEach(([payloadKey, payloadValue]) => {
                        if (cellValue.title === payloadKey) {
                            cellValue.isDate ?
                                row.push({
                                    title: <Moment local format='LLLL'>
                                    { payloadValue }
                                    </Moment>
                                }) :
                                row.push({ title: payloadValue } )
                            valueWasFound = true;
                        }
                    })
                    if(!valueWasFound){
                        row.push("")
                    }
                }
            })
            rows.push({ cells: row })
        })
    }
    return (rows);
}

const generateCells = (cells) => {
    var formattedCells = [];
    Object.entries(cells).forEach(([key, cell]) => {
        if (cell.isActive) {
            const { transforms, ...props } = cell;
            formattedCells.push(props);
        }
    })
    return(formattedCells)
}

const TrackTable = ({ payloads, cells, sort_dir, sort_by, isDisabled, onSort }) => <React.Fragment>
    <Table
        cells={generateCells(cells)}
        rows={generateRows(payloads, cells)}
        variant={TableVariant.compact}
        sortBy={isDisabled && {
            index: cells.findIndex(x => x.title === sort_by),
            direction: sort_dir
        }}
        onSort = {(index, dir) => onSort(index, dir) }
    >
        <TableHeader/>
        <TableBody/>
    </Table>
</React.Fragment>;

TrackTable.propTypes = {
    payloads: PropTypes.array,
    cells: PropTypes.object,
    sort_by: PropTypes.string,
    sort_dir: PropTypes.string,
    isDisabled: PropTypes.bool,
    onSort: PropTypes.func
};

const mapStateToProps = state => ({
    payloads: state.data.payloads,
    cells: state.cell.cells,
    sort_by: state.track.sort_by,
    sort_dir: state.track.sort_dir,
});

const mapStateToDispatch = dispatch => ({
    onSort: (index, dir) => dispatch([
        AppActions.removeTrackSortBy(),
        AppActions.removeTrackSortDir(),
        AppActions.setTrackSortBy(index),
        AppActions.setTrackSortDir(dir)
    ])
});

export default connect(mapStateToProps, mapStateToDispatch)(TrackTable);