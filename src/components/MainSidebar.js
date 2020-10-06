import * as AppActions from '../actions';

import { Nav, NavItem, NavList, PageSidebar } from '@patternfly/react-core';
import { PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from '../AppConstants';
import { contains, getFilterTypes, getObjFromSearch, getSearchFromObj } from '../utilities/Common';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const MainSidebar = ({ activeItem, onClickFn, isNavOpen, setTrackRequestID, location }) => {

    const { search } = location;

    const clickHandler = (pathname, search) => {
        setTrackRequestID(null);
        //get filters for new pathname
        const availableFilters = [...getFilterTypes(pathname), 'start_date', 'end_date'];
        // removes filters not pertinent to the new pathname
        const filteredObj = Object.fromEntries(Object.entries(getObjFromSearch(search)).filter((i) => {
            return contains(availableFilters, i[0]) && i[1] && i;
        }));
        // recreates URL using new search object
        onClickFn(`${pathname}${getSearchFromObj(filteredObj)}`);
    };

    return <PageSidebar
        nav = {<Nav>
            <NavList>
                <NavItem
                    to='/payloads'
                    itemId={ PAYLOADS_ITEM }
                    preventDefault
                    isActive={ activeItem === PAYLOADS_ITEM }
                    onClick={ () => clickHandler('/payloads', search) }
                >
                    Payloads
                </NavItem>
                <NavItem
                    to='/statuses'
                    itemId={ STATUSES_ITEM }
                    preventDefault
                    isActive={ activeItem === STATUSES_ITEM }
                    onClick={ () => clickHandler('/statuses', search) }
                >
                    Statuses
                </NavItem>
                <NavItem
                    to='/track'
                    itemId={ TRACK_ITEM }
                    preventDefault
                    isActive={ activeItem === TRACK_ITEM }
                    onClick={ () => clickHandler('/track', '') }
                >
                    Track
                </NavItem>
            </NavList>
        </Nav>}
        isNavOpen={ isNavOpen }
    />;
};

MainSidebar.propTypes = {
    activeItem: PropTypes.string,
    onClickFn: PropTypes.func,
    isNavOpen: PropTypes.bool,
    setTrackRequestID: PropTypes.func,
    location: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
    setTrackRequestID: (item) => dispatch(AppActions.setTrackRequestID(item))
});

export default connect((state) => ({
    location: state.router.location
}), mapDispatchToProps)(MainSidebar);
