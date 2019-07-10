import * as ConstantTypes from '../AppConstants';

const initialState = {
    cells: ConstantTypes.DEFAULT_CELL_STATE
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