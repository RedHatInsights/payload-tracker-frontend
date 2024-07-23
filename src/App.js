import './App.scss';

import * as AppActions from './actions';

import { API_URL, PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from './AppConstants';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import API from './utilities/Api';

import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';
import { Page } from '@patternfly/react-core';
import Payloads from './components/Payloads/Payloads';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Statuses from './components/Statuses/Statuses';
import Track from './components/Track/Track';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const App = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const [isNavOpen, toggleNav] = useState(false);
    const [activeItem, setActiveItem] = useState(PAYLOADS_ITEM);

    const onClickFn = (url) => { dispatch(push(url)); toggleNav(false); };

    useEffect(() => {
        pathname.indexOf('/app/payload-tracker/track') >= 0 ? setActiveItem(TRACK_ITEM) : (
            pathname === '/app/payload-tracker/payloads' ? setActiveItem(PAYLOADS_ITEM) :
                setActiveItem(STATUSES_ITEM)
        );
    }, [pathname]);

    // Check if the user has the required LDAP role in their identity header to download archives
    useEffect(() => {
        const getDownloadRole = async () => {
            const resp = await API.get(
                `${API_URL}/api/v1/roles/archiveLink`);
            if (resp.status === 200) {
                dispatch(AppActions.setHasDownloadRole(true));
            }
        };

        getDownloadRole();
    }, []);

    return <Page
        header={<MainHeader isNavOpen={isNavOpen} toggleNav={toggleNav} pathname={pathname}/>}
        sidebar={<MainSidebar activeItem={activeItem} onClickFn={onClickFn} isNavOpen={isNavOpen}/>}
    >
        <Switch>
            <Route path='/app/payload-tracker' exact render={() => <Redirect to='/app/payload-tracker/payloads'/>}/>
            <Route path='/app/payload-tracker/payloads' component={Payloads}/>
            <Route path='/app/payload-tracker/statuses' component={Statuses}/>
            <Route exact path='/app/payload-tracker/track' component={Track}/>
        </Switch>
    </Page>;

};

App.propTypes = {
    pathname: PropTypes.string,
    push: PropTypes.func,
    setHasDownloadRole: PropTypes.func
};

export default App;
