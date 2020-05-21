import * as ConstantTypes from '../AppConstants';

import { LOCATION_CHANGE } from 'connected-react-router';
import history from '../history';

const DEFAULT_CELL_STATE = history.location.pathname === '/home/payloads' ?
    ConstantTypes.DEFAULT_PAYLOAD_CELL_STATE :
    ConstantTypes.DEFAULT_STATUSES_CELL_STATE

const cells = DEFAULT_CELL_STATE.reduce((array, cell) => {
    var newCellActivity = ConstantTypes.GET_VALUE_FROM_URL(`${history.location.pathname}.${cell.title}Cell`);
    newCellActivity ?
        array.push({
            ...cell,
            isActive: false
        }) :
        array.push(cell);
    return array;
}, []);

const initialState = {
    cells: cells,
    cellPath: `${history.location.pathname}`
}

const CellReducer = (state=initialState, action) => {
    switch (action.type){
        case ConstantTypes.SET_CELL_ACTIVITY:
            return {
                ...state,
                cells: state.cells.map(cell => 
                    cell.title === action.title ?
                        {...cell, isActive: action.payload}
                    : cell
                )
            }
        case LOCATION_CHANGE:
            return action.payload.location.pathname === state.cellPath ? state : {
                ...state,
                cells: action.payload.location.pathname === '/home/payloads' ?
                    ConstantTypes.DEFAULT_PAYLOAD_CELL_STATE :
                    ConstantTypes.DEFAULT_STATUSES_CELL_STATE,
                cellPath: action.payload.location.pathname
            }
        default:
            return state;
    }
};

export default CellReducer;