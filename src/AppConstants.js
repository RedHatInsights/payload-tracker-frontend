import { textCenter } from '@patternfly/react-table';

export const SET_CELL_ACTIVITY = 'SET_CELL_ACTIVITY';
export const SET_ACTIVE_GROUP = 'SET_ACTIVE_GROUP';
export const SET_ACTIVE_ITEM= 'SET_ACTIVE_ITEM';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const GET_PAYLOADS = 'GET_PAYLOADS';
export const GET_PAYLOAD_TRACK = 'GET_PAYLOAD_TRACK';

export function MAP_STATE_TO_PROPS(state) {
    return { 
        cells: state.CellReducer.cells,
        activeGroup: state.SidebarReducer.activeGroup,
        activeItem: state.SidebarReducer.activeItem,
        isNavigationOpen: state.SidebarReducer.isNavigationOpen,
        payloads: state.PayloadsReducer.payloads,
        loading: state.PayloadsReducer.loading,
        loaded: state.PayloadsReducer.loaded,
        error: state.PayloadsReducer.error,
        count: state.PayloadsReducer.count,
    }
}

export const HOME_GROUP = 'grp1';
export const PAYLOADS_ITEM = `${HOME_GROUP}_itm1`;
export const TRACK_ITEM = `${HOME_GROUP}_itm2`;
export const DEFAULT_CELL_STATE = [
    {
        title: 'id',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'service',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'source',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'account',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'payload_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'inventory_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'system_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'status',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'status_msg',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'date',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    }
];