import * as AppActions from '../actions';

import { Nav, NavItem, NavList } from '@patternfly/react-core';
import { PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from '../AppConstants';
import { contains, getFilterTypes, getObjFromSearch, getSearchFromObj } from '../utilities/Common';

import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const MainSidebar = ({ activeItem, onClickFn }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const clickHandler = (pathname) => {
        //get filters for new pathname
        const availableFilters = [...getFilterTypes(pathname), 'start_date', 'end_date'];
        // removes filters not pertinent to the new pathname
        const filteredObj = Object.fromEntries(Object.entries(getObjFromSearch(location.search)).filter((i) => {
            return contains(availableFilters, i[0]) && i[1] && i;
        }));
        // recreates URL using new search object
        onClickFn(`${pathname}${getSearchFromObj(filteredObj)}`);
        dispatch(AppActions.setTrackRequestID(null));
    };

    return <Nav>
        <NavList>
            <NavItem
                to='/app/payload-tracker/payloads'
                itemId={ PAYLOADS_ITEM }
                preventDefault
                isActive={ activeItem === PAYLOADS_ITEM }
                onClick={ () => clickHandler('/app/payload-tracker/payloads') }
            >
                Payloads
            </NavItem>
            <NavItem
                to='/app/payload-tracker/statuses'
                itemId={ STATUSES_ITEM }
                preventDefault
                isActive={ activeItem === STATUSES_ITEM }
                onClick={ () => clickHandler('/app/payload-tracker/statuses') }
            >
                Statuses
            </NavItem>
            <NavItem
                to='/app/payload-tracker/track'
                itemId={ TRACK_ITEM }
                preventDefault
                isActive={ activeItem === TRACK_ITEM }
                onClick={ () => onClickFn('/app/payload-tracker/track') }
            >
                Track
            </NavItem>
        </NavList>
    </Nav>;
};

MainSidebar.propTypes = {
    activeItem: PropTypes.string,
    onClickFn: PropTypes.func
};

export default MainSidebar;
