import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from '../AppReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

export default createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
