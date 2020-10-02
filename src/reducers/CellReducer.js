import * as ConstantTypes from '../AppConstants';

import { LOCATION_CHANGE } from 'connected-react-router';
import { getValueFromURL } from '../utilities/Common';
import history from '../history';

const { location } = history;

const DEFAULT_CELL_STATE = location.pathname === '/payloads' ?
    ConstantTypes.DEFAULT_PAYLOAD_CELL_STATE :
    ConstantTypes.DEFAULT_STATUSES_CELL_STATE;

const cells = DEFAULT_CELL_STATE.reduce((arr, cell) => {
    const newCellActivity = getValueFromURL(location, `${cell.title}Cell`);
    return newCellActivity ? [...arr, { ...cell, isActive: false }] : [...arr, cell];
}, []);

const initialState = { cells, cellPath: `${history.location.pathname}` };

const CellReducer = (state = initialState, action) => {
    switch (action.type) {
        case ConstantTypes.SET_CELL_ACTIVITY:
            return {
                ...state,
                cells: state.cells.map(cell => {
                    return cell.title === action.title ? { ...cell, isActive: action.payload } : cell;
                })
            };
        case LOCATION_CHANGE:
            return action.payload.location.pathname === state.cellPath ? state : {
                ...state,
                cells: action.payload.location.pathname === '/payloads' ?
                    ConstantTypes.DEFAULT_PAYLOAD_CELL_STATE :
                    ConstantTypes.DEFAULT_STATUSES_CELL_STATE,
                cellPath: action.payload.location.pathname
            };
        default:
            return state;
    }
};

export default CellReducer;
