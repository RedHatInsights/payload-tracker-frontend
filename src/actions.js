import * as ActionTypes from './AppConstants';

export function setCellActivity(title, bool=false) {
    return {type: ActionTypes.SET_CELL_ACTIVITY, title: title,  payload: bool}
};