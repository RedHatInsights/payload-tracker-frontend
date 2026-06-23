import * as AppActions from './actions';

import { API_URL, PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from './AppConstants';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import API from './utilities/Api';

import ErrorBoundary from './components/ErrorBoundary';
import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';
import { Page, PageSidebar, PageSidebarBody } from '@patternfly/react-core';
import Payloads from './components/Payloads/Payloads';
import Statuses from './components/Statuses/Statuses';
import Track from './components/Track/Track';
import { useDispatch } from 'react-redux';

const App = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isNavOpen, toggleNav] = useState(false);
    const [activeItem, setActiveItem] = useState(PAYLOADS_ITEM);

    const onClickFn = (url) => { navigate(url); toggleNav(false); };

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
    }, [dispatch]);

    const masthead = <MainHeader isNavOpen={isNavOpen} toggleNav={toggleNav} pathname={pathname}/>;

    const sidebar = (
        <PageSidebar isSidebarOpen={isNavOpen}>
            <PageSidebarBody>
                <MainSidebar activeItem={activeItem} onClickFn={onClickFn}/>
            </PageSidebarBody>
        </PageSidebar>
    );

    return <Page
        masthead={masthead}
        sidebar={sidebar}
        onPageResize={() => {}}
    >
        <ErrorBoundary>
            <Routes>
                <Route path='/app/payload-tracker' element={<Navigate to='/app/payload-tracker/payloads' replace />}/>
                <Route path='/app/payload-tracker/payloads' element={<Payloads />}/>
                <Route path='/app/payload-tracker/statuses' element={<Statuses />}/>
                <Route path='/app/payload-tracker/track' element={<Track />}/>
            </Routes>
        </ErrorBoundary>
    </Page>;

};

export default App;
