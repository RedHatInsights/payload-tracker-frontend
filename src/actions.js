import * as ActionTypes from './AppConstants';
import * as ConstantTypes from './AppConstants';

import axios from 'axios';

var filterIndex = 0;

export function incFilterIndex() {
    return filterIndex += 1;
}

export function setCellActivity(title, bool=false) {
    return {
        type: ActionTypes.SET_CELL_ACTIVITY,
        title: title,
        payload: bool
    }
};

export function setCellInactive(title) {
    return {
        type: ActionTypes.SET_CELL_ACTIVITY,
        title: title,
        payload: false
    }
}

export function setCellActive(title) {
    return {
        type: ActionTypes.SET_CELL_ACTIVITY,
        title: title,
        payload: true
    }
}

export function setActiveGroup(group) {
    return {type: ActionTypes.SET_ACTIVE_GROUP, payload: group}
};

export function setActiveItem(item) {
    return {type: ActionTypes.SET_ACTIVE_ITEM, payload: item}
};

export function toggleNav(bool=true) {
    return {type: ActionTypes.TOGGLE_NAV, payload: !bool}
};

export const getData = (url) => dispatch => {
    dispatch({type: `${ActionTypes.GET_DATA}_PENDING`})
    axios.get(url)
        .then((response) => {
            dispatch({type: `${ActionTypes.GET_DATA}_FULFILLED`, payload: response.data})
        })
        .catch((error) => {
            dispatch({type: `${ActionTypes.GET_DATA}_REJECTED`, payload: error})
        })
};

export const getPayloadTrack = (url) => dispatch => {
    dispatch({type: `${ActionTypes.GET_PAYLOAD_TRACK}_PENDING`})
    axios.get(url)
        .then((response) => {
            dispatch({type: `${ActionTypes.GET_PAYLOAD_TRACK}_FULFILLED`, payload: response.data})
        })
        .catch((error) => {
            dispatch({type: `${ActionTypes.GET_PAYLOAD_TRACK}_REJECTED`, payload: error})
        })
};

export const updateDateRange = (moment, startId, endId) => dispatch => {

    const startDate = moment.start.format("YYYY-MM-DD");
    const endDate = moment.end.format("YYYY-MM-DD");

    dispatch([
        setStartDate(startDate),
        setEndDate(endDate),
        removeFilter(startId),
        removeFilter(endId),
        addFilter('date_gte', startDate),
        addFilter('date_lte', endDate)
    ]);
}

export function setStartDate(date) {
    return {
        type: ActionTypes.SET_START_DATE,
        payload: date,
    }
}

export function removeStartDate() {
    return {
        type: ActionTypes.SET_START_DATE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.startDate,
    }
}

export function setEndDate(date) {
    return {
        type: ActionTypes.SET_END_DATE,
        payload: date,
    }
}

export function removeEndDate() {
    return {
        type: ActionTypes.SET_END_DATE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.endDate,
    }
}

export function setPage(page) {
    return {
        type: ActionTypes.SET_PAGE,
        payload: page
    }
}

export function removePage() {
    return {
        type: ActionTypes.SET_PAGE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.page
    }
}

export function setPageSize(page_size) {
    return {
        type: ActionTypes.SET_PAGE_SIZE,
        payload: page_size
    }
}

export function removePageSize() {
    return {
        type: ActionTypes.SET_PAGE_SIZE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.page_size,
    }
}

export function addFilter(filterType, filterValue) {
    filterIndex += 1;
    return {
        type: ActionTypes.ADD_FILTER,
        payload: {
            id: filterIndex,
            type: filterType,
            value: filterValue
        }
    }
}

export function removeFilter(id) {
    return {
        type: ActionTypes.REMOVE_FILTER,
        payload: id
    }
}

export function setTrackRequestID(request_id) {
    return {
        type: ActionTypes.SET_TRACK_REQUEST_ID,
        payload: request_id,
        pushIDToUrl: {
            id: request_id
        }
    }
};

export function setTrackSortBy(sort_by) {
    return {
        type: ActionTypes.SET_TRACK_SORT_BY,
        payload: sort_by
    }
};

export function removeTrackSortBy() {
    return {
        type: ActionTypes.SET_TRACK_SORT_BY,
        payload: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by
    }
};

export function setTrackSortDir(sort_dir) {
    return {
        type: ActionTypes.SET_TRACK_SORT_DIR,
        payload: sort_dir
    }
};

export function removeTrackSortDir() {
    return {
        type: ActionTypes.SET_TRACK_SORT_DIR,
        payload: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir
    }
};

export function setActiveTabKey(key) {
    return {
        type: ActionTypes.SET_ACTIVE_TAB_KEY,
        payload: key
    }
}