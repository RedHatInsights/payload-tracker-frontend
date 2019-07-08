import * as ConstantTypes from '../AppConstants';

const initialState = {
    activeGroup: 'grp1',
    activeItem: 'itm1_grp1',
}

const SidebarReducer = (state=initialState, action) => {
    switch(action.type) {
        case (ConstantTypes.SET_ACTIVE_GROUP):
            return {
                ...state,
                activeGroup: action.payload
            }
        case (ConstantTypes.SET_ACTIVE_ITEM): 
            return {
                ...state,
                activeItem: action.payload
            }
        default:
            return state;
    }
};

export default SidebarReducer;