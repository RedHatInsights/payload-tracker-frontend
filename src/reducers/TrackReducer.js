import * as ConstantTypes from '../AppConstants';

import { LOCATION_CHANGE } from 'connected-react-router';
import { getValueFromURL } from '../utilities/Common';
import history from '../history';

const { location } = history;

const initialState = {
    sort_dir: getValueFromURL(location, 'sort_dir') || ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir,
    sort_by: getValueFromURL(location, 'sort_by') || ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by,
    request_id: history.location.pathname.split('/')[1] !== 'track' ?
        ConstantTypes.DEFAULT_TRACK_PAGE_STATE.request_id :
        history.location.pathname.split('/')[2]
};

const TrackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ConstantTypes.SET_TRACK_REQUEST_ID:
            return {
                ...state,
                request_id: action.payload
            };
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
        case LOCATION_CHANGE:
            return action.payload.location.pathname.indexOf('/app/payload-tracker/track') >= 0 ? state : {
                ...state,
                sort_dir: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir,
                sort_by: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by,
                request_id: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.request_id
            };
        default:
            return state;
    }
};

export default TrackReducer;
