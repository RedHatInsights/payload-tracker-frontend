import * as ActionTypes from './AppConstants';

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