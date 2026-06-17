import CellReducer from './reducers/CellReducer';
import DataReducer from './reducers/DataReducer';
import PayloadsReducer from './reducers/PayloadsReducer';
import TrackReducer from './reducers/TrackReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    cell: CellReducer,
    data: DataReducer,
    payloads: PayloadsReducer,
    track: TrackReducer
});
