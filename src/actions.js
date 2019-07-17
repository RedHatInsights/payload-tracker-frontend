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
        payload: false,
        pushVariableDataToUrl: {
            id: title,
            type: `${title}Cell`,
            value: 'inactive',
        }
    }
}

export function setCellActive(title) {
    return {
        type: ActionTypes.SET_CELL_ACTIVITY,
        title: title,
        payload: true,
        removeVariableDataFromUrl: {
            id: title,
        }
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

export const getPayloads = (url) => dispatch => {
    dispatch({type: `${ActionTypes.GET_PAYLOADS}_PENDING`})
    axios.get(url)
        .then((response) => {
            dispatch({type: `${ActionTypes.GET_PAYLOADS}_FULFILLED`, payload: response.data})
        })
        .catch((error) => {
            dispatch({type: `${ActionTypes.GET_PAYLOADS}_REJECTED`, payload: error})
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

export function setStartDate(date) {
    return {
        type: ActionTypes.SET_START_DATE,
        payload: date,
    }
}

export function removeStartDate() {
    return {
        type: ActionTypes.SET_START_DATE,
        payload: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.startDate,
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
        payload: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.endDate,
    }
}

export function setPayloadsPage(page) {
    return {
        type: ActionTypes.SET_PAYLOADS_PAGE,
        payload: page,
        pushToUrl: {
            page: page
        }
    }
}

export function removePayloadsPage() {
    return {
        type: ActionTypes.SET_PAYLOADS_PAGE,
        payload: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.page,
        removeFromUrl: {
            type: 'page'
        }
    }
}

export function setPayloadsPageSize(page_size) {
    return {
        type: ActionTypes.SET_PAYLOADS_PAGE_SIZE,
        payload: page_size,
        pushToUrl: {
            page_size: page_size
        }
    }
}

export function removePayloadsPageSize() {
    return {
        type: ActionTypes.SET_PAYLOADS_PAGE_SIZE,
        payload: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.page_size,
        removeFromUrl: {
            type: 'page_size'
        }
    }
}

export function setPayloadsSortDir(sort_dir) {
    return {
        type: ActionTypes.SET_PAYLOADS_SORT_DIR,
        payload: sort_dir,
        pushToUrl: {
            sort_dir: sort_dir
        }
    }
}

export function removePayloadsSortDir() {
    return {
        type: ActionTypes.SET_PAYLOADS_SORT_DIR,
        payload: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.sort_dir,
        removeFromUrl: {
            type: 'sort_dir'
        }
    }
}

export function setPayloadsSortBy(sort_by) {
    return {
        type: ActionTypes.SET_PAYLOADS_SORT_BY,
        payload: sort_by,
        pushToUrl: {
            sort_by: sort_by
        }
    }
}

export function removePayloadsSortBy() {
    return {
        type: ActionTypes.SET_PAYLOADS_SORT_BY,
        payload: ConstantTypes.DEFAULT_PAYLOADS_PAGE_STATE.sort_by,
        removeFromUrl: {
            type: 'sort_by'
        }
    }
}

export function addPayloadsFilter(filterType, filterValue) {
    filterIndex += 1;
    return {
        type: ActionTypes.ADD_PAYLOADS_FILTER,
        payload: {
            id: filterIndex,
            type: filterType,
            value: filterValue
        },
        pushVariableDataToUrl: {
            type: filterType,
            value: filterValue
        },  
    }
}

export function removePayloadsFilter(id) {
    return {
        type: ActionTypes.REMOVE_PAYLOADS_FILTER,
        payload: id,
        removeVariableDataFromUrl: {
            id: id
        }
    }
}

export function setTrackPayloadID(payload_id) {
    return {
        type: ActionTypes.SET_TRACK_PAYLOAD_ID,
        payload: payload_id
    }
};

export function setTrackSortBy(sort_by) {
    return {
        type: ActionTypes.SET_TRACK_SORT_BY,
        payload: sort_by,
        pushToUrl: {
            sort_by: sort_by
        }
    }
};

export function removeTrackSortBy() {
    return {
        type: ActionTypes.SET_TRACK_SORT_BY,
        payload: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by,
        removeFromUrl: {
            type: 'sort_by'
        }
    }
};

export function setTrackSortDir(sort_dir) {
    return {
        type: ActionTypes.SET_TRACK_SORT_DIR,
        payload: sort_dir,
        pushToUrl: {
            sort_dir: sort_dir
        }
    }
};

export function removeTrackSortDir() {
    return {
        type: ActionTypes.SET_TRACK_SORT_DIR,
        payload: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir,
        removeFromUrl: {
            type: 'sort_dir'
        }
    }
};