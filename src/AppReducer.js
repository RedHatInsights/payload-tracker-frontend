import { combineReducers } from 'redux';
import CellReducer from './reducers/CellReducer';
import SidebarReducer from './reducers/SidebarReducer';
import DataReducer from './reducers/DataReducer';
import PayloadsReducer from './reducers/PayloadsReducer';
import TrackReducer from './reducers/TrackReducer';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    cell: CellReducer, 
    sidebar: SidebarReducer, 
    data: DataReducer,
    payloads: PayloadsReducer,
    track: TrackReducer,
    router: connectRouter(history)
});