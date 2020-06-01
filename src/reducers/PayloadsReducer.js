import * as ConstantTypes from '../AppConstants';
import * as actions from '../actions';

import { LOCATION_CHANGE } from 'connected-react-router';
import history from '../history';

const location = history.location.pathname;

const FILTER_TYPES = ConstantTypes.PAYLOAD_FILTER_TYPES.concat(ConstantTypes.STATUS_FILTER_TYPES)

const determineFilters = () => {
    return FILTER_TYPES.reduce((array, filter) => {
        var newFilter = ConstantTypes.GET_VALUE_FROM_URL(`${location}.${filter}`)
        if (newFilter) {
            array.push({
                id: actions.incFilterIndex(),
                type: filter,
                value: newFilter
            });
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
        case ConstantTypes.ADD_FILTER:
            return {
                ...state,
                filters: [
                    ...state.filters,
                    {
                        id: action.payload.id,
                        type: action.payload.type,
                        value: action.payload.value
                    }
                ]
            }
        case ConstantTypes.REMOVE_FILTER:
            return {
                ...state,
                filters: state.filters.filter(filter => {
                    return filter.id !== action.payload
                })
            }
        case LOCATION_CHANGE:
            return action.payload.location.pathname === state.path ? state : {
                ...state,
                filters: determineFilters(),
                page: ConstantTypes.DEFAULT_PAGE_STATE.page,
                page_size: ConstantTypes.DEFAULT_PAGE_STATE.page_size,
                startDate: ConstantTypes.DEFAULT_PAGE_STATE.startDate,
                endDate: ConstantTypes.DEFAULT_PAGE_STATE.endDate,
                path: action.payload.location.pathname
            }
        default:
            return state;
    }
}