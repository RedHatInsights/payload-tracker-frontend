import * as ActionTypes from './AppConstants';
import * as ConstantTypes from './AppConstants';

import axios from 'axios';

export const setCellActivity = (title, bool = false) => {
    return {
        type: ActionTypes.SET_CELL_ACTIVITY,
        title,
        payload: bool,
        updateUrl: {
            type: `${title}Cell`,
            value: bool ? null : 'inactive'
        }
    };
};

export const toggleNav = (bool = true) => {
    return { type: ActionTypes.TOGGLE_NAV, payload: !bool };
};

export const getData = (url) => dispatch => {
    dispatch({ type: `${ActionTypes.GET_DATA}_PENDING` });
    axios.get(url)
    .then((response) => {
        dispatch({ type: `${ActionTypes.GET_DATA}_FULFILLED`, payload: response.data });
    })
    .catch((error) => {
        dispatch({ type: `${ActionTypes.GET_DATA}_REJECTED`, payload: error });
    });
};

export const getPayloadTrack = (url) => dispatch => {
    dispatch({ type: `${ActionTypes.GET_PAYLOAD_TRACK}_PENDING` });
    axios.get(url)
    .then((response) => {
        dispatch({ type: `${ActionTypes.GET_PAYLOAD_TRACK}_FULFILLED`, payload: response.data });
    })
    .catch((error) => {
        dispatch({ type: `${ActionTypes.GET_PAYLOAD_TRACK}_REJECTED`, payload: error });
    });
};

export const addMessage = (type, title, content) => {
    return {
        type: ActionTypes.ADD_MESSAGE,
        payload: {
            type, title, content
        }
    };
};

export const addNewTimeFilter = (currentType, start, end) => {
    return {
        type: ActionTypes.ADD_RECENT_TIME_FILTER,
        payload: {
            type: currentType,
            obj: {
                start,
                end
            }
        }
    };
};

export const setStartDate = (date) => {
    return {
        type: ActionTypes.SET_START_DATE,
        payload: date,
        updateUrl: {
            type: 'start_date',
            value: date
        }
    };
};

export const removeStartDate = () => {
    return {
        type: ActionTypes.SET_START_DATE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.startDate,
        updateUrl: {
            type: 'start_date',
            value: null
        }
    };
};

export const setEndDate = (date) => {
    return {
        type: ActionTypes.SET_END_DATE,
        payload: date,
        updateUrl: {
            type: 'end_date',
            value: date
        }
    };
};

export const removeEndDate = () => {
    return {
        type: ActionTypes.SET_END_DATE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.endDate,
        updateUrl: {
            type: 'end_date',
            value: null
        }
    };
};

export const updateDateRange = (start, end) => dispatch => {
    dispatch([
        setStartDate(start.toISOString()),
        setEndDate(end.toISOString())
    ]);
};

export const setPage = (page) => {
    return {
        type: ActionTypes.SET_PAGE,
        payload: page,
        updateUrl: {
            type: 'page',
            value: page
        }
    };
};

export const removePage = () => {
    return {
        type: ActionTypes.SET_PAGE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.page,
        updateUrl: {
            type: 'page',
            value: null
        }
    };
};

export const setPageSize = (page_size) => {
    return {
        type: ActionTypes.SET_PAGE_SIZE,
        payload: page_size,
        updateUrl: {
            type: 'page_size',
            value: page_size
        }
    };
};

export const removePageSize = () => {
    return {
        type: ActionTypes.SET_PAGE_SIZE,
        payload: ConstantTypes.DEFAULT_PAGE_STATE.page_size,
        updateUrl: {
            type: 'page_size',
            value: null
        }
    };
};

export const addPayloadFromSocket = (request) => {
    return {
        type: ActionTypes.ADD_PAYLOAD_FROM_SOCKET,
        payload: request
    };
};

export const updateDurationsFromSocket = (duration) => {
    return {
        type: ActionTypes.UPDATE_DURATIONS_FROM_SOCKET,
        payload: duration
    };
};

export const updateFilters = (filters) => {
    return {
        type: ActionTypes.UPDATE_FILTERS,
        payload: filters
    };
};

export const stageFilters = (filters) => {
    return {
        type: ActionTypes.STAGE_FILTERS,
        payload: filters
    };
};

export const unstageFilter = (filter) => {
    return {
        type: ActionTypes.UNSTAGE_FILTER,
        payload: filter
    };
};

export const setTrackRequestID = (request_id) => {
    return {
        type: ActionTypes.SET_TRACK_REQUEST_ID,
        payload: request_id,
        pushIDToUrl: {
            id: request_id
        }
    };
};

export const setTrackSortBy = (sort_by) => {
    return {
        type: ActionTypes.SET_TRACK_SORT_BY,
        payload: sort_by
    };
};

export const removeTrackSortBy = () => {
    return {
        type: ActionTypes.SET_TRACK_SORT_BY,
        payload: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_by
    };
};

export const setTrackSortDir = (sort_dir) => {
    return {
        type: ActionTypes.SET_TRACK_SORT_DIR,
        payload: sort_dir
    };
};

export const removeTrackSortDir = () => {
    return {
        type: ActionTypes.SET_TRACK_SORT_DIR,
        payload: ConstantTypes.DEFAULT_TRACK_PAGE_STATE.sort_dir
    };
};
