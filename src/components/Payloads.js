import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@patternfly/react-core/dist/styles/base.css';
import PayloadsTable from './PayloadsTable'
import {
    Pagination
} from '@patternfly/react-core';
  

class Payloads extends Component{

    constructor(){
        super();
        this.onSetPage = (_event, pageNumber) => {
            this.props.updateParameters({name: 'page', value: pageNumber})
            this.props.buildQuery();
        };
      
        this.onPerPageSelect = (_event, perPage) => {
            this.props.updateParameters({name: 'page_size', value: perPage})
            this.props.buildQuery();
        };
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
                <PayloadsTable 
                    payloads={this.props.payloads}
                />
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

export default Payloads;