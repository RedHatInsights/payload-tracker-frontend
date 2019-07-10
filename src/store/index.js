import { createStore, applyMiddleware } from 'redux';
import reducer from '../AppReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk)

export default createStore(reducer, middleware);