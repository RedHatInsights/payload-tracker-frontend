import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableHeader,
    TableBody,
    textCenter,
} from '@patternfly/react-table';
  

class Payloads extends Component{

    constructor(){
        super();
        this.state = {
            cells: cells,
        }
    }

    generateRows = () => {
        var rows = [];
        Object.values(this.props.payloads).forEach(payload => {
            var row = [];
            Object.entries(cells).forEach(([cellKey, cellValue]) => {
                var valueWasFound = false;
                Object.entries(payload).forEach(([payloadKey, payloadValue]) => {
                    if (cellValue.title === payloadKey) {
                        row.push(payloadValue)
                        valueWasFound = true;
                    }
                })
                if(!valueWasFound){
                    row.push("")
                }
            })
            rows.push(row)
        })
        return (rows);
    }

    render() {
        return (
            <Table 
                cells={this.state.cells} 
                rows={this.generateRows()}
            >
                <TableHeader/>
                <TableBody/>
            </Table>
        )
    }
}

Payloads.propTypes = {
    payloads: PropTypes.array.isRequired,
}

const cells = [
    {
        title: 'id',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'service',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'source',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'account',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'payload_id',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'inventory_id',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'system_id',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'status',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'status_msg',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'date',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'created_at',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    }
]

export default Payloads;