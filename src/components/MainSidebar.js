import * as AppActions from '../actions';

import {
    Nav,
    NavItem,
    NavItemSeparator,
    NavList,
    PageSidebar
} from '@patternfly/react-core';
import { PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from '../AppConstants'

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MainSidebar = ({ activeItem, isNavigationOpen, updateNav }) => {
    let history = useHistory();

    const clickHandler = (item, url) => {
        updateNav(item);
        history.push(url);
    };

    return (
        <PageSidebar
            nav = {<Nav>
                <NavList>
                    <NavItem
                        to='/payloads'
                        itemId={ PAYLOADS_ITEM }
                        preventDefault
                        isActive={ activeItem === PAYLOADS_ITEM }
                        onClick={ () => clickHandler(PAYLOADS_ITEM, '/payloads') }
                    >
                        Payloads
                    </NavItem>
                    <NavItemSeparator/>
                    <NavItem
                        to='/statuses'
                        itemId={ STATUSES_ITEM }
                        preventDefault
                        isActive={ activeItem === STATUSES_ITEM }
                        onClick={ () => clickHandler(STATUSES_ITEM, '/statuses') }
                    >
                        Statuses
                    </NavItem>
                    <NavItemSeparator/>
                    <NavItem
                        to='/track'
                        itemId={ TRACK_ITEM }
                        preventDefault
                        isActive={ activeItem === TRACK_ITEM }
                        onClick={ () => clickHandler(TRACK_ITEM, '/track') }
                    >
                        Track
                    </NavItem>
                </NavList>
            </Nav>}
            isNavOpen={ isNavigationOpen }
        />
    );
};

MainSidebar.propTypes = {
    activeGroup: PropTypes.string,
    activeItem: PropTypes.string,
    isNavigationOpen: PropTypes.bool,
    updateNav: PropTypes.func
};

const mapStateToProps = state => ({
    activeGroup: state.sidebar.activeGroup,
    activeItem: state.sidebar.activeItem,
    isNavigationOpen: state.sidebar.isNavigationOpen
});

const mapDispatchToProps = dispatch => ({
    updateNav: (item) => dispatch([
        AppActions.setActiveItem(item)
    ])
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebar);