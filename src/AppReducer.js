import CellReducer from './reducers/CellReducer';
import DataReducer from './reducers/DataReducer';
import PayloadsReducer from './reducers/PayloadsReducer';
import TrackReducer from './reducers/TrackReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    cell: CellReducer,
    data: DataReducer,
    payloads: PayloadsReducer,
    track: TrackReducer,
    router: connectRouter(history)
});