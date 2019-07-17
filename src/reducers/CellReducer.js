import * as ConstantTypes from '../AppConstants';
import history from '../history';

const cells = ConstantTypes.DEFAULT_CELL_STATE.reduce((array, cell) => {
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
    cells: cells
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
        default:
            return state;
    }
};

export default CellReducer;