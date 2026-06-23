import '@patternfly/react-core/dist/styles/base.css';

import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NotificationsPortal from './components/Notifications/NotificationsPortal';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <NotificationsPortal/>
            <App/>
        </BrowserRouter>
    </Provider>
);
