import { sortable } from '@patternfly/react-table';

export const API_URL = process.env.ENV === 'development' ? 'http://localhost:8080' : '/app/payload-tracker';

export const SET_CELL_ACTIVITY = 'SET_CELL_ACTIVITY';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const GET_DATA = 'GET_DATA';
export const GET_PAYLOAD_TRACK = 'GET_PAYLOAD_TRACK';

export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_SORT_DIR = 'SET_SORT_DIR';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_RECENT_TIME_TYPE = 'SET_RECENT_TIME_TYPE';

export const SET_TRACK_REQUEST_ID = 'SET_TRACK_REQUEST_ID';
export const SET_TRACK_SORT_DIR = 'SET_TRACK_SORT_DIR';
export const SET_TRACK_SORT_BY = 'SET_TRACK_SORT_BY';

export const SET_HAS_DOWNLOAD_ROLE = 'SET_HAS_DOWNLOAD_ROLE';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const STAGE_FILTERS = 'STAGE_FILTERS';
export const UNSTAGE_FILTER = 'UNSTAGE_FILTER';

export const UPDATE_FILTERS = 'UPDATE_FILTERS';

export const PAYLOAD_FILTER_TYPES = [
    'account', 'inventory_id', 'system_id'
];

export const STATUS_FILTER_TYPES = [
    'service', 'source', 'status', 'status_msg'
];

export const PAYLOADS_ITEM = `itm1`;
export const STATUSES_ITEM = `itm2`;
export const TRACK_ITEM = `itm3`;
export const DEFAULT_PAGE_STATE = {
    filters: [],
    page: 1,
    page_size: 10,
    startDate: null,
    endDate: null
};
export const DEFAULT_TRACK_PAGE_STATE = {
    request_id: undefined,
    sort_by: 'date',
    sort_dir: 'desc'
};
export const DEFAULT_DATA_REDUCER_STATE = {
    loading: false,
    loaded: false,
    error: null,
    messages: [],
    payloads: [],
    count: 0,
    durations: {}
};
export const DEFAULT_STATUSES_CELL_STATE = [
    {
        title: 'request_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
        isDate: false
    }, {
        title: 'service',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable]
    }, {
        title: 'source',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable]
    }, {
        title: 'status',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable]
    }, {
        title: 'status_msg',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable]
    }, {
        title: 'date',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: true,
        transforms: [sortable]
    }, {
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: true,
        transforms: [sortable]
    }
];
export const DEFAULT_PAYLOAD_CELL_STATE = [
    {
        title: 'request_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
        isDate: false
    }, {
        title: 'account',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable]
    }, {
        title: 'inventory_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable]
    }, {
        title: 'system_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        isDate: false,
        transforms: [sortable]
    }, {
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        isDate: true,
        transforms: [sortable]
    }
];
