import { combineReducers } from 'redux';
import CellReducer from './reducers/CellReducer';
import SidebarReducer from './reducers/SidebarReducer';

export default combineReducers({CellReducer, SidebarReducer});