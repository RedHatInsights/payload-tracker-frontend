import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import urlSyncMiddleware from '../middlewares/urlSync';
import { createLogger } from 'redux-logger';
import history from '../history';
import createRootReducer from '../AppReducer';
import thunk from 'redux-thunk';

const devLogger = createLogger({
    collapsed: true
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, routerMiddleware(history), urlSyncMiddleware]

export default createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
);