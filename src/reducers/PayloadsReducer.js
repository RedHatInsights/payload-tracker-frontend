import * as ConstantTypes from '../AppConstants';

import { getFilterTypes, getValueFromURL } from '../utilities/Common';

import { LOCATION_CHANGE } from 'connected-react-router';
import history from '../history';

const { location } = history;

const determineFilters = () => {
    return getFilterTypes(location.pathname).reduce((arr, filter) => {
        const value = getValueFromURL(location, filter);
        return value ? [...arr, { [filter]: value }] : arr;
    }, []);
};

const initialState = {
    filters: determineFilters() || ConstantTypes.DEFAULT_PAGE_STATE.filters,
    page: getValueFromURL(location, 'page') || ConstantTypes.DEFAULT_PAGE_STATE.page,
    page_size: getValueFromURL(location, 'page_size') || ConstantTypes.DEFAULT_PAGE_STATE.page_size,
    startDate: getValueFromURL(location, 'start_date') || ConstantTypes.DEFAULT_PAGE_STATE.startDate,
    endDate: getValueFromURL(location, 'end_date') || ConstantTypes.DEFAULT_PAGE_STATE.endDate,
    recentTimeType: 'created_at',
    staged: [],
    location
};

const PayloadsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ConstantTypes.SET_START_DATE:
            return {
                ...state,
                startDate: action.payload
            };
        case ConstantTypes.SET_END_DATE:
            return {
                ...state,
                endDate: action.payload
            };
        case ConstantTypes.SET_RECENT_TIME_TYPE:
            return {
                ...state,
                recentTimeType: action.payload
            };
        case ConstantTypes.SET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case ConstantTypes.SET_PAGE_SIZE:
            return {
                ...state,
                page_size: action.payload
            };
        case ConstantTypes.STAGE_FILTERS:
            return {
                ...state,
                staged: [...state.staged, ...[action.payload].flatMap(item => item)]
            };
        case ConstantTypes.UNSTAGE_FILTER:
            return {
                ...state,
                staged: state.staged.filter(item => item !== action.payload)
            };
        case ConstantTypes.UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload,
                staged: []
            };
        case LOCATION_CHANGE:
            return action.payload.location.pathname === state.location.pathname ? state : {
                ...state,
                filters: determineFilters(),
                page: ConstantTypes.DEFAULT_PAGE_STATE.page,
                page_size: ConstantTypes.DEFAULT_PAGE_STATE.page_size,
                location: action.payload.location,
                startDate: action.payload.location.pathname.includes('track') ? ConstantTypes.DEFAULT_PAGE_STATE.startDate : state.startDate,
                endDate: action.payload.location.pathname.includes('track') ? ConstantTypes.DEFAULT_PAGE_STATE.endDate : state.endDate,
                recentTimeType: initialState.recentTimeType
            };
        default:
            return state;
    }
};

export default PayloadsReducer;
