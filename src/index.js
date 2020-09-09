import '@patternfly/react-core/dist/styles/base.css';

import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import NotificationsPortal from './components/Notifications/NotificationsPortal';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <NotificationsPortal/>
            <App/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);