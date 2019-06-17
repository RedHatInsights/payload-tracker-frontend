import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@patternfly/react-core/dist/styles/base.css';
import {
    Table,
    TableHeader,
    TableBody,
    SortByDirection,
    textCenter,
} from '@patternfly/react-table';
import {
    Pagination,
    PaginationVariant
} from '@patternfly/react-core';
  

class Payloads extends Component{

    constructor(){
        super();
        this.state = {
            cells:cells,
            sortBy:{},
            page: 1,
            perPage: 20
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
        this.onSetPage = (_event, pageNumber) => {
            this.setState({
              page: pageNumber
            });
        };
      
        this.onPerPageSelect = (_event, perPage) => {
            this.setState({
                perPage
            });
        };
      }

    render() {
        return (
            <div> 
                <Pagination 
                        itemCount={this.props.rows.length}
                        perPage={this.state.perPage}
                        page={this.state.page}
                        onSetPage={this.onSetPage}
                        widgetId="pagination-options-menu-top"
                        onPerPageSelect={this.onPerPageSelect}
                />
                <Table 
                    cells={this.state.cells} 
                    rows={this.props.rows}
                    sortBy={this.state.sortBy}
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