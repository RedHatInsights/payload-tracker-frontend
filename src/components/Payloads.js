import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import { MAP_STATE_TO_PROPS } from '../AppConstants';
import SearchBar from './SearchBar';
import PayloadsPagination from './PayloadsPagination';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { getPayloads, setStartDate, setEndDate, setCellActivity } from '../actions'

const queryBase = 'http://localhost:8080/v1/payloads?';

class Payloads extends Component {
    queryParameters = {
        filters: [],
        page: 1,
        page_size: 10,
        sort_dir: 'desc',
        sort_by: 'date',
    }

    componentWillMount(){
        const params = queryString.parse(this.props.location.search);

        Object.entries(params).forEach(([param, value]) => {
            if (param === 'hidden[]') {
                typeof value === 'string' ?
                this.props.dispatch(setCellActivity(value)):
                value.map(cell => {
                    this.props.dispatch(setCellActivity(cell))
                })
            } else {
                this.updateParameters({name: param, value: value})
            }
        })

        this.buildQuery()
    }

    runRedirect = (path='/home/payloads') => {

        const { sort_by, sort_dir, page, page_size, filters } = this.queryParameters
        path += `?sort_by=${sort_by}&sort_dir=${sort_dir}&page=${page}&page_size=${page_size}`

        Object.entries(filters).forEach(([id, filter]) => {
            path += `&${filter.key}=${filter.value}`
        })

        Object.entries(this.props.cells).forEach(([key, value]) => {
            if (!value.isActive) {
                path += `&hidden[]=${value.title}`;
            }
        })

        this.props.history.push(path);
    }

    updateParameters = newParam => {
        if (newParam.name === "page") {
            this.queryParameters.page = Number(newParam.value)
        }
        else if (newParam.name === "page_size") {
            this.queryParameters.page_size = Number(newParam.value)
            this.queryParameters.page = 1;
        }
        else if (newParam.name === "Sort Dir" || newParam.name === "sort_dir") {
            this.queryParameters.sort_dir = newParam.value
            this.queryParameters.page = 1;
        }
        else if (newParam.name === "Sort By" || newParam.name === "sort_by") {
            this.queryParameters.sort_by = newParam.value
            this.queryParameters.page = 1;
        } else if (newParam.name === 'date_gte'){
            this.props.dispatch(setStartDate(newParam.value))
            for(var i = 0; i < this.queryParameters.filters.length; i++) {
                if(this.queryParameters.filters[i].key === 'date_gte'){
                    this.queryParameters.filters.splice(i,1)
                }
            }
        } else if (newParam.name === 'date_lte'){
            this.props.dispatch(setEndDate(newParam.value))
            for(var i = 0; i < this.queryParameters.filters.length; i++) {
                if(this.queryParameters.filters[i].key === 'date_lte'){
                    this.queryParameters.filters.splice(i,1)
                }
            }
        } else {
            this.queryParameters.filters.push({
                id: this.queryParameters.filters.length,
                key: newParam.name,
                value: newParam.value
            })
            this.queryParameters.page = 1;
        }
        this.buildQuery()
    }

    buildQuery = () => {
        var query = queryBase;
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
        this.search(query);
    }

    search = (query) => {
        this.props.dispatch(getPayloads(query));
    }

    render() {
        return(
            <Page 
                header={<MainHeader {...this.props} />} 
                sidebar={<MainSidebar {...this.props} />} 
                isManagedSidebar
            >
                <PageSection variant={PageSectionVariants.dark}>
                    <SearchBar
                        filters={this.props.filters} 
                        buildQuery={this.buildQuery}
                        updateParameters={this.updateParameters}
                        runRedirect={this.runRedirect}
                        dispatch={this.props.dispatch}
                    />
                </PageSection>
                <PageSection variant={PageSectionVariants.light} style={{height:'80vh', maxWidth:'100vw', overflow:'auto'}}>
                    <PayloadsPagination
                        page={this.queryParameters.page}
                        page_size={this.queryParameters.page_size}
                        sort_by={this.queryParameters.sort_by}
                        sort_dir={this.queryParameters.sort_dir}
                        updateParameters={this.updateParameters}
                        runRedirect={this.runRedirect}
                        {...this.props}
                    />
                </PageSection>
            </Page>
        )
    }
}

export default connect(MAP_STATE_TO_PROPS)(Payloads);