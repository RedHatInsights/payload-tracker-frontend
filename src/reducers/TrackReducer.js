import * as ConstantTypes from '../AppConstants';

import { LOCATION_CHANGE } from 'connected-react-router';
import history from '../history';

const sort_dir = ConstantTypes.GET_VALUE_FROM_URL('/track.sort_dir');
const sort_by = ConstantTypes.GET_VALUE_FROM_URL('/track.sort_by');

const initialState = {
    sort_dir: sort_dir === null ? ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir : sort_dir,
    sort_by: sort_by === null ? ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by : sort_by,
    activeTabKey: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.activeTabKey,
    request_id: history.location.pathname === '/track' ?
        ConstantTypes.DEFAULT_TRACK_PAGE_STATE.request_id :
        history.location.pathname.split('/')[3]
};

const TrackReducer = (state=initialState, action) => {
    switch(action.type) {
        case ConstantTypes.SET_TRACK_REQUEST_ID:
            return {
                ...state,
                request_id: action.payload
            }
        case ConstantTypes.SET_TRACK_SORT_BY:
            return {
                ...state,
                sort_by: action.payload
            };
        case ConstantTypes.SET_TRACK_SORT_DIR:
            return {
                ...state,
                sort_dir: action.payload
            };
        case ConstantTypes.SET_ACTIVE_TAB_KEY:
            return {
                ...state,
                activeTabKey: action.payload
            }
        case LOCATION_CHANGE:
            return action.payload.location.pathname.indexOf('/track') >= 0 ? state : {
                ...state,
                sort_dir: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir,
                sort_by: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by,
                activeTabKey: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.activeTabKey,
                request_id: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.request_id
            }
        default:
            return state;
    }
}

export default TrackReducer;