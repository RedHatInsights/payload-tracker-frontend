import { combineReducers } from 'redux';
import CellReducer from './reducers/CellReducer';
import SidebarReducer from './reducers/SidebarReducer';
import PayloadsReducer from './reducers/PayloadsReducer';

export default combineReducers({CellReducer, SidebarReducer, PayloadsReducer});