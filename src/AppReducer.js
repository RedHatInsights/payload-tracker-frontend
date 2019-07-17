import { combineReducers } from 'redux';
import CellReducer from './reducers/CellReducer';
import SidebarReducer from './reducers/SidebarReducer';
import DataReducer from './reducers/DataReducer';
import PayloadsReducer from './reducers/PayloadsReducer';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    cell: CellReducer, 
    sidebar: SidebarReducer, 
    data: DataReducer,
    payloads: PayloadsReducer,
    router: connectRouter(history)
});