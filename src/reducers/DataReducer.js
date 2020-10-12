import * as ConstantTypes from '../AppConstants';

import { LOCATION_CHANGE } from 'connected-react-router';
import history from '../history';

const { location } = history;

const initialState = {
    loading: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.loading,
    loaded: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.loaded,
    error: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.error,
    messages: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.messages,
    payloads: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.payloads,
    count: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.count,
    durations: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.durations,
    location
};

const DataReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${ConstantTypes.GET_DATA}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${ConstantTypes.GET_DATA}_REJECTED`:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case `${ConstantTypes.GET_DATA}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loaded: true,
                payloads: action.payload.data,
                count: action.payload.count
            };
        case `${ConstantTypes.GET_PAYLOAD_TRACK}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${ConstantTypes.GET_PAYLOAD_TRACK}_REJECTED`:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case `${ConstantTypes.GET_PAYLOAD_TRACK}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loaded: true,
                payloads: action.payload.data,
                durations: action.payload.duration
            };
        case ConstantTypes.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case LOCATION_CHANGE:
            return action.payload.location.pathname === state.location.pathname ? state : {
                ...state,
                loading: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.loading,
                loaded: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.loaded,
                error: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.error,
                messages: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.messages,
                payloads: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.payloads,
                count: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.count,
                durations: ConstantTypes.DEFAULT_DATA_REDUCER_STATE.durations,
                location: action.payload.location
            };
        default:
            return state;
    }
};

export default DataReducer;
