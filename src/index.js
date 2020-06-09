import { Provider, ReactReduxContext } from 'react-redux';

import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import store from './store';

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <App/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);