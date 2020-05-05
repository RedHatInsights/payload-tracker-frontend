import * as AppActions from '../actions';

import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import React, { useEffect } from 'react';

import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import PayloadsPagination from './PayloadsPagination';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';

const queryBase = '/v1/payloads?';

const Payloads = ({ getPayloads, sort_dir, sort_by, page, page_size, filters }) => {

    const search = () => {
        var query = queryBase;
        query += `sort_by=${sort_by}&sort_dir=${sort_dir}&page=${page - 1}&page_size=${page_size}`
        filters && filters.map(filter => 
            query += `&${filter.type}=${filter.value}`
        )
        getPayloads(query)
    }

    useEffect(() => {
        search();
    });
    
    return(
        <Page 
            header={<MainHeader />} 
            sidebar={<MainSidebar />} 
            isManagedSidebar
        >
            <PageSection variant={PageSectionVariants.dark}>
                <SearchBar/>
            </PageSection>
            <PageSection 
                id='payloads_page'
                variant={PageSectionVariants.light}
                style={{height:'80vh', overflow:'auto'}}
            >
                <PayloadsPagination/>
            </PageSection>
        </Page>
    )
};

Payloads.propTypes = {
    getPayloads: PropTypes.func,
    sort_dir: PropTypes.string,
    sort_by: PropTypes.string,
    page: PropTypes.number,
    page_size: PropTypes.number,
    filters: PropTypes.array
};

const mapStateToProps = state => ({
    sort_dir: state.payloads.sort_dir,
    sort_by: state.payloads.sort_by,
    page: state.payloads.page,
    page_size: state.payloads.page_size,
    filters: state.payloads.filters,
});

const mapDispatchToProps = dispatch => ({
    getPayloads: (url) => dispatch(AppActions.getPayloads(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payloads);