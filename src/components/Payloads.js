import * as AppActions from '../actions';
import * as ConstantTypes from '../AppConstants';

import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Table from './Table'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const queryBase = '/v1/payloads?';

const Payloads = ({ getPayloads, page, page_size, filters }) => {

    let history = useHistory();
    const [sortDir, setSortDir] = useState(ConstantTypes.GET_VALUE_FROM_URL(`${history.location.pathname}.sort_dir`) || 'asc');
    const [sortBy, setSortBy] = useState(ConstantTypes.GET_VALUE_FROM_URL(`${history.location.pathname}.sort_by`) || '');

    const search = () => {
        var query = queryBase;
        query += `sort_by=${sortBy}&sort_dir=${sortDir}&page=${page - 1}&page_size=${page_size}`
        filters && filters.map(filter => 
            query += `&${filter.type}=${filter.value}`
        )
        getPayloads(query)
    }

    useEffect(() => {
        search();
    }, [sortDir, sortBy, page, page_size, filters]);

    return(
        <Page 
            header={<MainHeader />} 
            sidebar={<MainSidebar />} 
            isManagedSidebar
        >
            <PageSection variant={PageSectionVariants.dark}>
                <SearchBar/>
            </PageSection>
            <PageSection variant={PageSectionVariants.light}>
                <Pagination>
                    <div style={{maxWidth:'100vw', overflow:'auto'}}>
                        <Table
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
                    </div>
                </Pagination>
            </PageSection>
        </Page>
    )
};

Payloads.propTypes = {
    getPayloads: PropTypes.func,
    page: PropTypes.number,
    page_size: PropTypes.number,
    filters: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    page: state.payloads.page,
    page_size: state.payloads.page_size,
    filters: state.payloads.filters,
    loading: state.data.loading
});

const mapDispatchToProps = dispatch => ({
    getPayloads: (url) => dispatch(AppActions.getData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payloads);