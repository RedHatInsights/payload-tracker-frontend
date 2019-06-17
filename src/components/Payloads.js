import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@patternfly/react-core/dist/styles/base.css';
import Payload from './Payload.js';
import {
    Table,
    TableHeader,
    TableBody,
    SortByDirection,
    textCenter,
  } from '@patternfly/react-table';
  

class Payloads extends Component{

    constructor(){
        super();
        this.state = {
            cells:cells,
            sortBy:{},
        }
        this.onSort = this.onSort.bind(this);
    }
    
    onSort(_event, index, direction) {
        const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        this.setState({
          sortBy: {
            index,
            direction
          },
          rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
        });
      }

    render() {
        return (
            <Table 
                caption='Payloads'
                cells={this.state.cells} 
                rows={this.props.rows}
                sortBy={this.state.sortBy}
            >
                <TableHeader/>
                <TableBody/>
            </Table>
        )
    }
}

Payloads.propTypes = {
    payloads: PropTypes.array.isRequired,
    rows: PropTypes.array,
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
        title: 'status message',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'date',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'created at',
        transforms: [textCenter],
        cellTransforms: [textCenter],
    }
]

export default Payloads;