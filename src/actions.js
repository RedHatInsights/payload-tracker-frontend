import * as ActionTypes from './AppConstants';

export function setCellActivity(bool=false) {
    return {type: ActionTypes.SET_CELL, payload: bool}
};