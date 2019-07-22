import * as ConstantTypes from '../AppConstants';
import * as actions from '../actions';
import { LOCATION_CHANGE } from 'connected-react-router';

const filters = ConstantTypes.FILTER_TYPES.reduce((array, filter) => {
    var newFilter = ConstantTypes.GET_VALUE_FROM_URL(`/home/payloads.${filter}`)
    if (newFilter) {
        array.push({
            id: actions.incFilterIndex(),
            type: filter,
            value: newFilter
        });
    }
    return array;
}, []);
const page = ConstantTypes.GET_VALUE_FROM_URL('/home/payloads.page');
const page_size = ConstantTypes.GET_VALUE_FROM_URL('/home/payloads.page_size');
const sort_dir = ConstantTypes.GET_VALUE_FROM_URL('/home/payloads.sort_dir');
const sort_by = ConstantTypes.GET_VALUE_FROM_URL('/home/payloads.sort_by');
const startDate = ConstantTypes.GET_VALUE_FROM_URL('/home/payloads.startDate');
const endDate = ConstantTypes.GET_VALUE_FROM_URL('/home/payloads.endDate');

const initialState = {
    filters: filters === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.filters : filters,
    page: page === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.page : page,
    page_size: page_size === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.page_size : page_size,
    sort_dir: sort_dir === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.sort_dir : sort_dir,
    sort_by: sort_by === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.sort_by : sort_by,
    startDate: startDate === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.startDate : startDate,
    endDate: endDate === null ? ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.endDate : endDate
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
        case ConstantTypes.SET_PAYLOADS_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case ConstantTypes.SET_PAYLOADS_PAGE_SIZE:
            return {
                ...state,
                page_size: action.payload
            }
        case ConstantTypes.SET_PAYLOADS_SORT_DIR:
            return {
                ...state,
                sort_dir: action.payload
            }
        case ConstantTypes.SET_PAYLOADS_SORT_BY:
            return {
                ...state,
                sort_by: action.payload
            }
        case ConstantTypes.ADD_PAYLOADS_FILTER:
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
        case ConstantTypes.REMOVE_PAYLOADS_FILTER:
            return {
                ...state,
                filters: state.filters.filter(filter => {
                    return filter.id !== action.payload
                })
            }
        case LOCATION_CHANGE:
            return action.payload.location.pathname === '/home/payloads' ? state : {
                ...state,
                filters: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.filters,
                page: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.page,
                page_size: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.page_size,
                sort_dir: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.sort_dir,
                sort_by: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.sort_by,
                startDate: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.startDate,
                endDate: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.endDate
            }
        default:
            return state;
    }
}