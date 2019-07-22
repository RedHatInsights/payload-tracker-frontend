import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import { MAP_STATE_TO_PROPS, CHECK_OBJECT_EQUIVALENCE } from '../AppConstants';
import SearchBar from './SearchBar';
import PayloadsPagination from './PayloadsPagination';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import { connect } from 'react-redux';
import { getPayloads } from '../actions';

const queryBase = '/v1/payloads?';

class Payloads extends Component {

    componentDidMount() {
        this.search(); 
    }

    componentDidUpdate(prevProps) {
        if (!CHECK_OBJECT_EQUIVALENCE(prevProps.payloadsParams, this.props.payloadsParams)) {
            this.search();
        }
    }

    search = () => {
        var query = queryBase;
        const { sort_by, sort_dir, page, page_size, filters } = this.props.payloadsParams
        query += `sort_by=${sort_by}&sort_dir=${sort_dir}&page=${page - 1}&page_size=${page_size}`

        if(filters) {
            filters.map(filter => {
                query += `&${filter.type}=${filter.value}`
            })
        }
 
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
                        filters={this.props.payloadsParams.filters}
                        dispatch={this.props.dispatch}
                    />
                </PageSection>
                <PageSection variant={PageSectionVariants.light} style={{height:'80vh', maxWidth:'100vw', overflow:'auto'}}>
                    <PayloadsPagination
                        page={this.props.payloadsParams.page}
                        page_size={this.props.payloadsParams.page_size}
                        sort_by={this.props.payloadsParams.sort_by}
                        sort_dir={this.props.payloadsParams.sort_dir}
                        {...this.props}
                    />
                </PageSection>
            </Page>
        )
    }
}

export default connect(MAP_STATE_TO_PROPS)(Payloads);