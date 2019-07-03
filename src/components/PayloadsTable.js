import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableVariant
} from '@patternfly/react-table';

const generateRows = (props) => {
    var rows = [];
    Object.values(props.payloads).forEach(payload => {
        var row = [];
        Object.entries(props.cells).forEach(([cellKey, cellValue]) => {
            var valueWasFound = false;
            if (cellValue.isActive) {
                Object.entries(payload).forEach(([payloadKey, payloadValue]) => {
                    if (cellValue.title === payloadKey) {
                        row.push(payloadValue)
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

export default function Payloads(props) {

    const rows = generateRows(props)
    const cells = generateCells(props)

    return (
        <div style={{height:'100vh', overflow:'auto'}}>
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
}