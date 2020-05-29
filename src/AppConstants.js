import history from './history';
import queryString from 'query-string';
import { sortable } from '@patternfly/react-table';

export const SET_CELL_ACTIVITY = 'SET_CELL_ACTIVITY';
export const SET_ACTIVE_ITEM= 'SET_ACTIVE_ITEM';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const GET_DATA = 'GET_DATA';
export const GET_PAYLOAD_TRACK = 'GET_PAYLOAD_TRACK';

export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_SORT_DIR = 'SET_SORT_DIR';
export const SET_SORT_BY = 'SET_SORT_BY';

export const SET_TRACK_REQUEST_ID = 'SET_TRACK_REQUEST_ID';
export const SET_TRACK_SORT_DIR = 'SET_TRACK_SORT_DIR';
export const SET_TRACK_SORT_BY = 'SET_TRACK_SORT_BY';

export const ADD_FILTER = 'ADD_FILTER';
export const ADD_PAYLOAD_FROM_SOCKET = 'ADD_PAYLOAD_FROM_SOCKET';

export const REMOVE_FILTER = 'REMOVE_FILTER';

export const PAYLOAD_FILTER_TYPES = [
    'account', 'inventory_id', 'system_id', 'created_at_lt',
    'created_at_gt', 'created_at_lte', 'created_at_gte'
];

export const STATUS_FILTER_TYPES = [
    'service', 'source', 'status', 'status_msg', 'date_lt',
    'date_gt', 'date_lte', 'date_gte', 'created_at_lt',
    'created_at_gt', 'created_at_lte', 'created_at_gte'
];

export function GET_VALUE_FROM_URL(input) {
    const [pathname, prop] = input.split('.');
  
    const currentLocation = history.location;
  
    if (currentLocation.pathname !== `${pathname}`) {
      return null;
    }

    const query = queryString.parse(currentLocation.search);
    const targetProp = query[prop];
  
    return targetProp === undefined ? null : targetProp;
}

export const PAYLOADS_ITEM = `itm1`;
export const STATUSES_ITEM = `itm2`
export const TRACK_ITEM = `itm3`;
export const DEFAULT_PAGE_STATE = {
    filters: [],
    page: 1,
    page_size: 10,
    startDate: null,
    endDate: null
};
export const DEFAULT_TRACK_PAGE_STATE = {
    request_id: '',
    sort_by: 'date',
    sort_dir: 'desc'
};
export const DEFAULT_DATA_REDUCER_STATE = {
    loading: false,
    loaded: false,
    error: null,
    payloads: [],
    count: 0,
    durations: {},
};
export const DEFAULT_STATUSES_CELL_STATE = [
    {
        title: 'id',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: false,
    },{
        title: 'request_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
        isDate: false,
    },{
        title: 'service',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable],
    },{
        title: 'source',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable],
    },{
        title: 'status',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable],
    },{
        title: 'status_msg',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable],
    },{
        title: 'date',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: true,
        transforms: [sortable],
    },{
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: true,
        transforms: [sortable],
    }
];
export const DEFAULT_PAYLOAD_CELL_STATE = [
    {
        title: 'request_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
        isDate: false,
    },{
        title: 'account',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'inventory_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable],
    },{
        title: 'system_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable],
    },{
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: true,
        transforms: [sortable],
    }
];