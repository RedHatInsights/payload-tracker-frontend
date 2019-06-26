import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import SearchBar from './SearchBar';
import Payloads from './Payloads';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import { SphereSpinner } from 'react-spinners-kit';

const queryBase = '/v1/payloads?';

class Track extends Component {

    state = {
        payloads: [],
        count: 0,
        loading: false,
        isNavOpen: true,
    }
    queryParameters = {
        filters: [],
        page: 1,
        page_size: 10,
        sort_dir: 'asc',
        sort_by: 'payload_id',
    }

    componentDidMount(){
        this.search(queryBase)
    }

    setNavStatus = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    updateParameters = newParam => {
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
        this.setState({loading: true});
        fetch(query)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({loading: false});
            this.setState({
                payloads: result.data,
                count: result.count,
            });
          },
          (error) => {
            this.setState({loading: false});
            this.setState({
              error
            });
          }
        )
        .then(this.forceUpdate())
    }

    render() {
        const { loading, isNavOpen } = this.state;
        return(
            <Page header={<MainHeader setNavStatus={this.setNavStatus}/>} 
                  sidebar={<MainSidebar isNavOpen={isNavOpen}/>} isManagedSidebar>
                <PageSection variant={PageSectionVariants.dark}>
                    <SearchBar
                        filters={this.queryParameters.filters} 
                        buildQuery={this.buildQuery}
                        updateParameters={this.updateParameters}
                    />
                </PageSection>
                <PageSection variant={PageSectionVariants.light} style={{minHeight:'800px'}}>
                    <Payloads 
                        payloads={this.state.payloads} 
                        count={this.state.count}
                        page={this.queryParameters.page}
                        page_size={this.queryParameters.page_size}
                        buildQuery={this.buildQuery}
                        updateParameters={this.updateParameters}
                    />
                    <div style={{display: 'flex', justifyContent: 'center', padding:'50px'}}>
                        <SphereSpinner loading={loading} color='#000000' size={70}/>
                    </div>
                </PageSection>
            </Page>
        )
    }
}

export default Track;