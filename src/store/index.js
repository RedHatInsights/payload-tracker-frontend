import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import urlSyncMiddleware from '../middlewares/urlSync';
import { reduxBatch } from '@manaflair/redux-batch';
import history from '../history';
import createRootReducer from '../AppReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, routerMiddleware(history), urlSyncMiddleware]

export default createStore(
    createRootReducer(history),
    composeEnhancers(reduxBatch, applyMiddleware(...middlewares), reduxBatch)
);