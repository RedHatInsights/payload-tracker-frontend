import { applyMiddleware, compose, createStore } from 'redux';

import createRootReducer from '../AppReducer';
import history from '../history';
import { reduxBatch } from '@manaflair/redux-batch';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, routerMiddleware(history)]

export default createStore(
    createRootReducer(history),
    composeEnhancers(reduxBatch, applyMiddleware(...middlewares), reduxBatch)
);