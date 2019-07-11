import * as ActionTypes from './AppConstants';
import axios from 'axios';

export function setCellActivity(title, bool=false) {
    return {type: ActionTypes.SET_CELL_ACTIVITY, title: title,  payload: bool}
};

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
    return {type: ActionTypes.SET_START_DATE, payload: date}
}

export function setEndDate(date) {
    return {type: ActionTypes.SET_END_DATE, payload: date}
}