import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <App/> 
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);