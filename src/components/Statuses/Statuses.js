import './Statuses.scss';

import * as AppActions from '../../actions';
import * as ConstantTypes from '../../AppConstants';

import { PageSection, PageSectionVariants, Text, TextContent, TextVariants } from '@patternfly/react-core';
import React, { useCallback, useEffect, useState } from 'react';

import FilterToolbar from '../Filters/FilterToolbar';
import Pagination from '../Pagination';
import PropTypes from 'prop-types';
import Table from '../Table';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const queryBase = `${ConstantTypes.API_URL}/v1/statuses?`;

const Statuses = ({ getStatuses, page, page_size, filters, startDate, endDate, recentTimeType }) => {
    let history = useHistory();
    const [sortDir, setSortDir] = useState(ConstantTypes.GET_VALUE_FROM_URL(`${history.location.pathname}.sort_dir`) || 'desc');
    const [sortBy, setSortBy] = useState(ConstantTypes.GET_VALUE_FROM_URL(`${history.location.pathname}.sort_by`) || 'date');

    const search = useCallback(() => {
        var query = queryBase;
        query += `sort_by=${sortBy}&sort_dir=${sortDir}&page=${page - 1}&page_size=${page_size}`;
        query += filters.reduce((str, filter) => {
            const filterStr = Object.entries(filter).reduce((filter, [key, value]) => filter +=`&${key}=${value}`, '');
            return str += filterStr;
        }, '');
        if (startDate) {
            query += `&${recentTimeType}_gte=${startDate}`;
        }
        if (endDate) {
            query += `&${recentTimeType}_lte=${endDate}`;
        }
        getStatuses(query);
    }, [getStatuses, sortBy, sortDir, page, page_size, filters, startDate, endDate, recentTimeType]);

    useEffect(() => {
        search();
    }, [sortDir, sortBy, page, page_size, filters, search, startDate, endDate, recentTimeType]);

    return <div className='pt-c-statuses__content'>
        <FilterToolbar options={ConstantTypes.STATUS_FILTER_TYPES.filter(type => type !== 'partition')}/>
        <PageSection variant={PageSectionVariants.light}>
            <TextContent className='pt-c-statuses__header'>
                <Text component={TextVariants.h1}> Recorded Statuses </Text>
            </TextContent>
            <Pagination>
                <Table
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </Pagination>
        </PageSection>
    </div>;
};

Statuses.propTypes = {
    getStatuses: PropTypes.func,
    page: PropTypes.number,
    page_size: PropTypes.number,
    filters: PropTypes.array,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    recentTimeType: PropTypes.string
};

const mapStateToProps = state => ({
    page: state.payloads.page,
    page_size: state.payloads.page_size,
    filters: state.payloads.filters,
    startDate: state.payloads.startDate,
    endDate: state.payloads.endDate,
    recentTimeType: state.payloads.recentTimeType
});

const mapDispatchToProps = dispatch => ({
    getStatuses: (url) => dispatch(AppActions.getData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statuses);