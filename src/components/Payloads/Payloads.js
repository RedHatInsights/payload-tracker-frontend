import './Payloads.scss';

import * as AppActions from '../../actions';
import * as ConstantTypes from '../../AppConstants';

import { PageSection, Content, ContentVariants } from '@patternfly/react-core';
import { useEffect, useRef, useState } from 'react';

import FilterToolbar from '../Filters/FilterToolbar';
import Pagination from '../Pagination';
import Table from '../Table';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const queryBase = `${ConstantTypes.API_URL}/api/v1/payloads?`;

const Payloads = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = useSelector(state => state.payloads.page);
    const page_size = useSelector(state => state.payloads.page_size);
    const filters = useSelector(state => state.payloads.filters, shallowEqual);
    const startDate = useSelector(state => state.payloads.startDate);
    const endDate = useSelector(state => state.payloads.endDate);
    const recentTimeType = useSelector(state => state.payloads.recentTimeType);
    const dispatch = useDispatch();

    const [sortDir, updateDir] = useState(searchParams.get('sort_dir') || 'desc');
    const [sortBy, updateBy] = useState(searchParams.get('sort_by') || 'created_at');
    const debounceTimer = useRef(null);

    useEffect(() => {
        dispatch(AppActions.initializeCells('payloads'));

        const urlPage = searchParams.get('page');
        const urlPageSize = searchParams.get('page_size');
        const urlStartDate = searchParams.get(`${recentTimeType}_gte`) || searchParams.get('created_at_gte');
        const urlEndDate = searchParams.get(`${recentTimeType}_lte`) || searchParams.get('created_at_lte');

        if (urlPage && parseInt(urlPage) !== page) {
            dispatch(AppActions.setPage(parseInt(urlPage)));
        }

        if (urlPageSize && parseInt(urlPageSize) !== page_size) {
            dispatch(AppActions.setPageSize(parseInt(urlPageSize)));
        }

        if (urlStartDate || urlEndDate) {
            dispatch(AppActions.updateDateRange(
                urlStartDate ? new Date(urlStartDate) : null,
                urlEndDate ? new Date(urlEndDate) : null
            ));
        }

        const urlFilters = [];
        ConstantTypes.PAYLOAD_FILTER_TYPES.forEach(filterType => {
            const value = searchParams.get(filterType);
            if (value) {
                urlFilters.push({ [filterType]: value });
            }
        });
        if (urlFilters.length > 0) {
            dispatch(AppActions.updateFilters(urlFilters));
        } else if (filters.length > 0) {
            dispatch(AppActions.updateFilters([]));
        }

        return () => {
            dispatch(AppActions.updateFilters([]));
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            const params = {};

            if (sortBy) {params.sort_by = sortBy;}

            if (sortDir) {params.sort_dir = sortDir;}

            if (page) {params.page = String(page);}

            if (page_size) {params.page_size = String(page_size);}

            if (startDate) {params[`${recentTimeType}_gte`] = startDate;}

            if (endDate) {params[`${recentTimeType}_lte`] = endDate;}

            filters.forEach(filter => {
                Object.entries(filter).forEach(([key, value]) => {
                    params[key] = value;
                });
            });

            setSearchParams(params, { replace: true });
        }, 300);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [sortDir, sortBy, page, page_size, filters, startDate, endDate, recentTimeType, setSearchParams]);

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
    }, [sortDir, sortBy, page, page_size, filters, startDate, endDate, recentTimeType, dispatch]);

    return <div className='pt-c-payloads__content'>
        <FilterToolbar options={ConstantTypes.PAYLOAD_FILTER_TYPES}/>
        <PageSection hasBodyWrapper={false} variant="secondary">
            <Content className='pt-c-header'>
                <Content component={ContentVariants.h1}> Recorded Requests </Content>
            </Content>
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

export default Payloads;
