import './Statuses.scss';

import * as AppActions from '../../actions';
import * as ConstantTypes from '../../AppConstants';

import { PageSection, Text, TextContent, TextVariants } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import FilterToolbar from '../Filters/FilterToolbar';
import Pagination from '../Pagination';
import Table from '../Table';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getValueFromURL } from '../../utilities/Common';
import { useLocation } from 'react-router-dom';

const queryBase = `${ConstantTypes.API_URL}/api/v1/statuses?`;

const Statuses = () => {
    const location = useLocation();

    const page = useSelector(state => state.payloads.page);
    const page_size = useSelector(state => state.payloads.page_size);
    const filters = useSelector(state => state.payloads.filters, shallowEqual);
    const startDate = useSelector(state => state.payloads.startDate);
    const endDate = useSelector(state => state.payloads.endDate);
    const recentTimeType = useSelector(state => state.payloads.recentTimeType);
    const dispatch = useDispatch();

    const [sortDir, updateDir] = useState(getValueFromURL(location, 'sort_dir') || 'desc');
    const [sortBy, updateBy] = useState(getValueFromURL(location, 'sort_by') || 'date');

    useEffect(() => {
        let query = queryBase;
        query += `sort_by=${sortBy}&sort_dir=${sortDir}&page=${page - 1}&page_size=${page_size}`;
        query += filters.reduce((str, filter) => {
            const filterStr = Object.entries(filter).reduce((filter, [key, value]) => filter += `&${key}=${value}`, '');
            return str += filterStr;
        }, '');
        query += startDate ? `&${recentTimeType}_gte=${startDate}` : '';
        query += endDate ? `&${recentTimeType}_lte=${endDate}` : '';
        dispatch(AppActions.getData(query));
    }, [sortDir, sortBy, page, page_size, filters, startDate, endDate, recentTimeType]);

    return <div className='pt-c-statuses__content'>
        <FilterToolbar options={ConstantTypes.STATUS_FILTER_TYPES}/>
        <PageSection>
            <TextContent className='pt-c-header'>
                <Text component={TextVariants.h1}> Recorded Statuses </Text>
            </TextContent>
            <Pagination>
                <Table
                    sortDir={sortDir}
                    setSortDir={(dir) => (dispatch(AppActions.setSortDir(dir)), updateDir(dir))}
                    sortBy={sortBy}
                    setSortBy={(by) => (dispatch(AppActions.setSortBy(by)), updateBy(by))}
                />
            </Pagination>
        </PageSection>
    </div>;
};

export default Statuses;
