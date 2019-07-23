import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableVariant,
} from '@patternfly/react-table';
import HoverableAttribute from './HoverableAttribute'
import Moment from 'react-moment';
import 'moment-timezone';
import { 
    setPayloadsSortBy, setPayloadsSortDir,
    removePayloadsSortDir, removePayloadsSortBy 
} from '../actions';

Moment.globalTimezone = 'America/New_York';
Moment.globalFormat = 'LLLL z';

const generateRows = props => {
    var rows = [];
    Object.values(props.payloads).forEach(payload => {
        var row = [];
        Object.entries(props.cells).forEach(([cellKey, cellValue]) => {
            var valueWasFound = false;
            if (cellValue.isActive) {
                Object.entries(payload).forEach(([payloadKey, payloadValue]) => {
                    if (cellValue.title === payloadKey) {
                        if (cellValue.isFilterable) {
                            row.push({
                                title: <HoverableAttribute
                                    type='filter'
                                    payloadKey={payloadKey}
                                    payloadValue={payloadValue}
                                    {...props}
                                />,
                                props: { 
                                    component: 'th' 
                            }})
                        } else if (cellValue.isTrackable) {
                            row.push({
                                title: <HoverableAttribute
                                    type='track'
                                    payloadKey={payloadKey}
                                    payloadValue={payloadValue}
                                    {...props}
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

const generateCells = (props) => {
    var cells = [];
    Object.entries(props.cells).forEach(([key, cell]) => {
        if (cell.isActive) {
            cells.push(cell);
        }
    })
    return(cells)
}

function onSort(_event, index, direction, props) {
    props.dispatch([
        removePayloadsSortBy(),
        setPayloadsSortBy(index),
        removePayloadsSortDir(),
        setPayloadsSortDir(direction)
    ]);
}

export default function PayloadsTable(props) {

    const rows = generateRows({...props})
    const cells = generateCells({...props})
    
    const sortBy = {
        index: cells.findIndex(x => x.title === props.sort_by),
        direction: props.sort_dir
    }

    return (
        <div>
            <Table 
                cells={cells} 
                rows={rows}
                variant={TableVariant.compact}
                sortBy={sortBy}
                onSort={(e, index, direction) => onSort(e, cells[index].title, direction, {...props})}
            >
                <TableHeader/>
                <TableBody/>
            </Table>
        </div>
    )
}