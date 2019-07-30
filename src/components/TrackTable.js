import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableVariant
} from '@patternfly/react-table';
import Moment from 'react-moment';
import { setTrackSortBy, setTrackSortDir, removeTrackSortBy, removeTrackSortDir } from '../actions';

const generateRows = (props) => {
    var rows = [];
    if (props.payloads) {
        Object.values(props.payloads).forEach(payload => {
            var row = [];
            Object.entries(props.cells).forEach(([cellKey, cellValue]) => {
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
        removeTrackSortBy(),
        removeTrackSortDir(),
        setTrackSortBy(index),
        setTrackSortDir(direction)
    ]);
}

export default function TrackTable(props) {

    const rows = generateRows(props)
    const cells = generateCells(props)

    const sortBy = {
        index: cells.findIndex(x => x.title === props.sort_by),
        direction: props.sort_dir
    }

    if (props.isDisabled) {
        return (
            <div>
                <Table
                    cells={cells} 
                    rows={rows}
                    variant={TableVariant.compact}
                >
                    <TableHeader/>
                    <TableBody/>
                </Table>
            </div>
        )
    } else {
        return (
            <div>
                <Table 
                    cells={cells} 
                    rows={rows}
                    variant={TableVariant.compact}
                    sortBy={sortBy}
                    onSort = { (e, index, direction) => onSort(e, cells[index].title, direction, {...props}) }
                >
                    <TableHeader/>
                    <TableBody/>
                </Table>
            </div>
        )
    }
}