import * as ConstantTypes from '../AppConstants';

const initialState = {
    loading: false,
    loaded: false,
    error: null,
    payloads: [],
    count: 0,
}

const DataReducer = (state=initialState, action) => {
    switch(action.type) {
        case `${ConstantTypes.GET_PAYLOADS}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${ConstantTypes.GET_PAYLOADS}_REJECTED`:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case `${ConstantTypes.GET_PAYLOADS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loaded: true,
                payloads: action.payload.data,
                count: action.payload.count
            }
        case `${ConstantTypes.GET_PAYLOAD_TRACK}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${ConstantTypes.GET_PAYLOAD_TRACK}_REJECTED`:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case `${ConstantTypes.GET_PAYLOAD_TRACK}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loaded: true,
                payloads: action.payload
            }
        default: {
            return state;
        }
    }
}

export default DataReducer;