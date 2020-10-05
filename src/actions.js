import * as ActionTypes from './AppConstants';

import axios from 'axios';

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

export const setCellActivity = (title, bool = false) => ({
    type: ActionTypes.SET_CELL_ACTIVITY,
    title,
    payload: bool
});

export const setRecentTimeType = (type) => ({
    type: ActionTypes.SET_RECENT_TIME_TYPE,
    payload: type
});

export const addMessage = (type, title, content) => ({
    type: ActionTypes.ADD_MESSAGE,
    payload: {
        type, title, content
    }
});

export const setStartDate = (date) => ({
    type: ActionTypes.SET_START_DATE,
    payload: date
});

export const setEndDate = (date) => ({
    type: ActionTypes.SET_END_DATE,
    payload: date
});

export const updateDateRange = (start, end) => dispatch => {
    dispatch(setStartDate(start && start.toISOString()));
    dispatch(setEndDate(start && end.toISOString()));
};

export const setPage = (page) => ({
    type: ActionTypes.SET_PAGE,
    payload: page
});

export const setPageSize = (page_size) => ({
    type: ActionTypes.SET_PAGE_SIZE,
    payload: page_size
});

export const addPayloadFromSocket = (request) => ({
    type: ActionTypes.ADD_PAYLOAD_FROM_SOCKET,
    payload: request
});

export const updateDurationsFromSocket = (duration) => ({
    type: ActionTypes.UPDATE_DURATIONS_FROM_SOCKET,
    payload: duration
});

export const updateFilters = (filters) => ({
    type: ActionTypes.UPDATE_FILTERS,
    payload: filters
});

export const stageFilters = (filters) => ({
    type: ActionTypes.STAGE_FILTERS,
    payload: filters
});

export const unstageFilter = (filter) => ({
    type: ActionTypes.UNSTAGE_FILTER,
    payload: filter
});

export const setTrackRequestID = (request_id) => ({
    type: ActionTypes.SET_TRACK_REQUEST_ID,
    payload: request_id
});

export const setTrackSortBy = (sort_by) => ({
    type: ActionTypes.SET_TRACK_SORT_BY,
    payload: sort_by
});

export const setTrackSortDir = (sort_dir) => ({
    type: ActionTypes.SET_TRACK_SORT_DIR,
    payload: sort_dir
});
