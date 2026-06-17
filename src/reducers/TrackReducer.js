import * as ConstantTypes from '../AppConstants';

import { getValueFromURL } from '../utilities/Common';
import history from '../history';

const { location } = history;

const initialState = {
    sort_dir: getValueFromURL(location, 'sort_dir') || ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir,
    sort_by: getValueFromURL(location, 'sort_by') || ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by,
    request_id: history.location.pathname.split('/')[1] !== 'track' ?
        ConstantTypes.DEFAULT_TRACK_PAGE_STATE.request_id :
        history.location.pathname.split('/')[2],
    has_download_role: false
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
        case ConstantTypes.SET_HAS_DOWNLOAD_ROLE:
            return {
                ...state,
                has_download_role: action.payload
            };
        default:
            return state;
    }
};

export default TrackReducer;
