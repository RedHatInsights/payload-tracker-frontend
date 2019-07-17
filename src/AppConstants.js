import { sortable } from '@patternfly/react-table';
import history from './history';
import queryString from 'query-string';

export const SET_CELL_ACTIVITY = 'SET_CELL_ACTIVITY';
export const SET_ACTIVE_GROUP = 'SET_ACTIVE_GROUP';
export const SET_ACTIVE_ITEM= 'SET_ACTIVE_ITEM';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const GET_PAYLOADS = 'GET_PAYLOADS';
export const GET_PAYLOAD_TRACK = 'GET_PAYLOAD_TRACK';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_PAYLOADS_PAGE = 'SET_PAYLOADS_PAGE';
export const SET_PAYLOADS_PAGE_SIZE = 'SET_PAYLOADS_PAGE_SIZE';
export const SET_PAYLOADS_SORT_DIR = 'SET_PAYLOADS_SORT_DIR';
export const SET_PAYLOADS_SORT_BY = 'SET_PAYLOADS_SORT_BY';
export const ADD_PAYLOADS_FILTER = 'ADD_PAYLOADS_FILTER';
export const REMOVE_PAYLOADS_FILTER = 'REMOVE_PAYLOADS_FILTER';
export const SET_TRACK_PAYLOAD_ID = 'SET_TRACK_PAYLOAD_ID';
export const SET_TRACK_SORT_DIR = 'SET_TRACK_SORT_DIR';
export const SET_TRACK_SORT_BY = 'SET_TRACK_SORT_BY';

export const FILTER_TYPES = [
    'service', 'source', 'account', 'inventory_id', 
    'system_id', 'status', 'status_msg', 'date_lt', 
    'date_gt', 'date_lte', 'date_gte', 'created_at_lt',
    'created_at_gt', 'created_at_lte', 'created_at_gte'
];

export function MAP_STATE_TO_PROPS(state) {
    return { 
        cells: state.cell.cells,
        activeGroup: state.sidebar.activeGroup,
        activeItem: state.sidebar.activeItem,
        isNavigationOpen: state.sidebar.isNavigationOpen,
        payloads: state.data.payloads,
        loading: state.data.loading,
        loaded: state.data.loaded,
        error: state.data.error,
        count: state.data.count,
        payloadsParams: {
            startDate: state.payloads.startDate,
            endDate: state.payloads.endDate,
            filters: state.payloads.filters,
            page: state.payloads.page,
            page_size: state.payloads.page_size,
            sort_by: state.payloads.sort_by,
            sort_dir: state.payloads.sort_dir
        },
        trackParams: {
            payload_id: state.track.payload_id,
            sort_by: state.track.sort_by,
            sort_dir: state.track.sort_dir
        }
    }
}

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

export const HOME_GROUP = 'grp1';
export const PAYLOADS_ITEM = `${HOME_GROUP}_itm1`;
export const TRACK_ITEM = `${HOME_GROUP}_itm2`;
export const DEFAULT_PAYLOADS_PAGE_STATE = {
    filters: [],
    page: 1,
    page_size: 10,
    sort_by: 'date',
    sort_dir: 'desc',
    startDate: null,
    endDate: null
}
export const DEFAULT_TRACK_PAGE_STATE = {
    payload_id: '',
    sort_by: 'date',
    sort_dir: 'desc'
}

export const DEFAULT_CELL_STATE = [
    {
        title: 'id',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
    },{
        title: 'service',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'source',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'account',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'payload_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
    },{
        title: 'inventory_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'system_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'status',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'status_msg',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'date',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [sortable],
    },{
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [sortable],
    }
];