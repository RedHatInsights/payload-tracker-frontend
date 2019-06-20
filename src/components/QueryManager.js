import React, { Component } from 'react';
import MainPage from './MainPage';

class QueryManager extends Component {

    queryParameters = {
        filters: [],
        page: 1,
        page_size: 10,
        sort_dir: 'asc',
        sort_by: 'payload_id',
    }

    updateParameters = (newParam) => {
        if (newParam.name === 'page') {
            this.queryParameters.page = newParam.value
        }
        if (newParam.name === 'page_size') {
            this.queryParameters.page_size = newParam.value
            this.queryParameters.page = 1;
        }
        if (newParam.name === 'Sort Dir') {
            this.queryParameters.sort_dir = newParam.value
            this.queryParameters.page = 1;
        }
        if (newParam.name === 'Sort By') {
            this.queryParameters.sort_by = newParam.value
            this.queryParameters.page = 1;
        }
    };
    
      buildQuery = (payload_id) => {
        var query = queryBase;
        if(payload_id) {
          query = `http://localhost:8080/v1/payloads/${payload_id}?`
        } else {
          Object.entries(this.queryParameters).forEach(([param, value]) => {
            if (param === 'filters'){
              Object.values(value).forEach(filter => {
                query = query + `${filter.key}=${filter.value}&`
              });
            } else if (param === 'page') {
              // Must include -1 since pages start at 0 in API and at 1 in pagination
              query = query + `${param}=${value - 1}&`
            } else {
              query = query + `${param}=${value}&`
            }
          });
        }
        this.props.search(query);
    };

    render(){
        return(
            <MainPage 
                updateParameters={this.updateParameters}
                buildQuery={this.buildQuery}
                filters={this.queryParameters.filters}
                page={this.queryParameters.page}
                page_size={this.queryParameters.page_size}
                payloads={this.props.payloads}
                count={this.props.count}
            />
        )
    }
}

const queryBase = 'http://localhost:8080/v1/payloads?';

export default QueryManager;