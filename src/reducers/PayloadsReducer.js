import * as ConstantTypes from '../AppConstants';
import * as actions from '../actions';

import { LOCATION_CHANGE } from 'connected-react-router';
import history from '../history';

const location = history.location.pathname;

const FILTER_TYPES = ConstantTypes.PAYLOAD_FILTER_TYPES.concat(ConstantTypes.STATUS_FILTER_TYPES)

const determineFilters = () => {
    return FILTER_TYPES.reduce((array, filter) => {
        const value = ConstantTypes.GET_VALUE_FROM_URL(`${location}.${filter}`)
        if (value) {
            array.push({ [filter]: value });
        }
        return array;
    }, []);
};

const filters = determineFilters();
const page = ConstantTypes.GET_VALUE_FROM_URL(`${location}.page`);
const page_size = ConstantTypes.GET_VALUE_FROM_URL(`${location}.page_size`);
const startDate = ConstantTypes.GET_VALUE_FROM_URL(`${location}.startDate`);
const endDate = ConstantTypes.GET_VALUE_FROM_URL(`${location}.endDate`);

const initialState = {
    filters: filters === null ? ConstantTypes.DEFAULT_PAGE_STATE.filters : filters,
    page: page === null ? ConstantTypes.DEFAULT_PAGE_STATE.page : page,
    page_size: page_size === null ? ConstantTypes.DEFAULT_PAGE_STATE.page_size : page_size,
    startDate: startDate === null ? ConstantTypes.DEFAULT_PAGE_STATE.startDate : startDate,
    endDate: endDate === null ? ConstantTypes.DEFAULT_PAGE_STATE.endDate : endDate,
    recentTimeFilters: [{start: null, end: null}],
    recentTimeType: null,
    staged: [],
    path: `${location}`
};

export default (state=initialState, action) => {
    switch(action.type) {  
        case ConstantTypes.SET_START_DATE:
            return {
                ...state,
                startDate: action.payload
            }
        case ConstantTypes.SET_END_DATE:
            return {
                ...state,
                endDate: action.payload
            }
        case ConstantTypes.ADD_RECENT_TIME_FILTER:
            return {
                ...state,
                recentTimeType: action.payload.type,
                recentTimeFilters: [action.payload.obj, ...state.recentTimeFilters]
            }
        case ConstantTypes.SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case ConstantTypes.SET_PAGE_SIZE:
            return {
                ...state,
                page_size: action.payload
            }
        case ConstantTypes.STAGE_FILTERS:
            return {
                ...state,
                staged: [...state.staged, ...[action.payload].flatMap(item => item)]
            }
        case ConstantTypes.UNSTAGE_FILTER:
            return {
                ...state,
                staged: state.staged.filter(item => item !== action.payload)
            }
        case ConstantTypes.UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload,
                staged: []
            }
        case LOCATION_CHANGE:
            return action.payload.location.pathname === state.path ? state : {
                ...state,
                filters: determineFilters(),
                page: ConstantTypes.DEFAULT_PAGE_STATE.page,
                page_size: ConstantTypes.DEFAULT_PAGE_STATE.page_size,
                path: action.payload.location.pathname,
                recentTimeType: action.payload.location.pathname === '/payloads' ? 'created_at' : state.recentTimeType
            }
        default:
            return state;
    }
}