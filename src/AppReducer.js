import { combineReducers, createStore } from 'redux';
import * as ConstantTypes from './AppConstants';

const reducer = (state=ConstantTypes.DEFAULT_CELL_STATE, action) => {
    switch (action.type){
        case ConstantTypes.SET_CELL_ACTIVITY:
            state.map(cell => {
                if(cell.title = action.title) {
                    return { ...cell.isActive, ...action.payload }
                };
            });
        default:
            return state;
    }
};

export default createStore(reducer);