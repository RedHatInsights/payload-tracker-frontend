import 'moment-timezone';

import * as AppActions from '../actions';

import {
    Table,
    TableBody,
    TableHeader,
    TableVariant,
} from '@patternfly/react-table';

import HoverableAttribute from './HoverableAttribute'
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

Moment.globalTimezone = 'America/New_York';
Moment.globalFormat = 'LLLL z';

const generateRows = (payloads, cells) => {
    var rows = [];
    Object.values(payloads).map(payload => {
        var row = [];
        Object.entries(cells).map(([cellKey, cellValue]) => {
            var valueWasFound = false;
            if (cellValue.isActive) {
                Object.entries(payload).map(([payloadKey, payloadValue]) => {
                    if (cellValue.title === payloadKey) {
                        if (cellValue.isFilterable) {
                            row.push({
                                title: <HoverableAttribute
                                    type='filter'
                                    value={payloadValue}
                                    filter={payloadKey}
                                />,
                                props: { 
                                    component: 'th'
                            }})
                        } else if (cellValue.isTrackable) {
                            row.push({
                                title: <HoverableAttribute
                                    type='track'
                                    value={payloadValue}
                                />,
                                props: { 
                                    component: 'th'
                            }})
                        } else if (cellValue.isDate) {
                            row.push({
                                title: <Moment>
                                { `${payloadValue}-0000` }
                                </Moment> 
                            })
                        } else {
                            row.push({ title: payloadValue })
                        }
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
    return (rows);
}

const generateCells = (cells) => {
    var output = [];
    Object.entries(cells).forEach(([key, cell]) => {
        if (cell.isActive) {
            output.push(cell);
        }
    });
    return output;
};

const PayloadsTable = ({ payloads, cells, sort_by, sort_dir, updateSort }) => {

    const formattedRows = generateRows(payloads, cells);
    const formattedCells = generateCells(cells);
    
    const onSort = (_event, index, direction) => {
        updateSort(index, direction);
    }
    
    const sortBy = {
        index: formattedCells.findIndex(x => x.title === sort_by),
        direction: sort_dir
    }

    return (
        <div>
            <Table 
                cells={formattedCells} 
                rows={formattedRows}
                variant={TableVariant.compact}
                sortBy={sortBy}
                onSort={(e, index, direction) => onSort(e, formattedCells[index].title, direction)}
            >
                <TableHeader/>
                <TableBody/>
            </Table>
        </div>
    )
};

PayloadsTable.propTypes = {
    payloads: PropTypes.array,
    cells: PropTypes.object,
    sort_by: PropTypes.any,
    sort_dir: PropTypes.any,
    updateSort: PropTypes.func
};

const mapStateToProps = state => ({
    payloads: state.data.payloads,
    cells: state.cell.cells,
    sort_by: state.payloads.sort_by,
    sort_dir: state.payloads.sort_dir
});

const mapDispatchToProps = dispatch => ({
    updateSort: (index, direction) => dispatch([
        AppActions.removePayloadsSortBy(),
        AppActions.setPayloadsSortBy(index),
        AppActions.removePayloadsSortDir(),
        AppActions.setPayloadsSortDir(direction)
    ])
});

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsTable);