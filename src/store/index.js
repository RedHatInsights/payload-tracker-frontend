import { applyMiddleware, compose, createStore } from 'redux';

import createRootReducer from '../AppReducer';
import history from '../history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import urlSyncMiddleware from '../middlewares/urlSync';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, routerMiddleware(history), urlSyncMiddleware];

export default createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
);
