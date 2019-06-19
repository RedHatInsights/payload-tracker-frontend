import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@patternfly/react-core/dist/styles/base.css';
import {
    Table,
    TableHeader,
    TableBody,
    textCenter,
} from '@patternfly/react-table';
import {
    Pagination
} from '@patternfly/react-core';
  

class Payloads extends Component{

    constructor(){
        super();
        this.state = {
            cells: cells,
            isLoaded: false,
        }
        this.onSetPage = (_event, pageNumber) => {
            this.props.updateParameters({name: 'page', value: pageNumber})
            this.props.buildQuery();
        };
      
        this.onPerPageSelect = (_event, perPage) => {
            this.props.updateParameters({name: 'page_size', value: perPage})
            this.props.buildQuery();
        };
    }

    generateRows = () => {
        var rows = [];
        Object.values(this.props.payloads).forEach(payload => {
            var row = [];
            var index = 0;
            Object.entries(payload).forEach(([key, value]) => {
                while((key !== cells[index].title)){
                    row.push("");
                    index += 1;
                }
                row.push(value);
                index += 1;
            }) 
            rows.push(row)
        });
        return (rows)
    }

    render() {
        return (
            <div> 
                <Pagination 
                        itemCount={this.props.count}
                        perPage={this.props.page_size}
                        page={this.props.page}
                        onSetPage={this.onSetPage}
                        widgetId="pagination-options-menu-top"
                        onPerPageSelect={this.onPerPageSelect}
                />
                <Table 
                    cells={this.state.cells} 
                    rows={this.generateRows()}
                >
                    <TableHeader/>
                    <TableBody/>
                </Table>
            </div>
        )
    }
}

Payloads.propTypes = {
    payloads: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    buildQuery: PropTypes.func.isRequired,
    updateParameters: PropTypes.func.isRequired,
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