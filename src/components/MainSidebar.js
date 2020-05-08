import * as AppActions from '../actions';

import { HOME_GROUP, PAYLOADS_ITEM, TRACK_ITEM } from '../AppConstants'
import {
    Nav,
    NavExpandable,
    NavItem,
    NavItemSeparator,
    NavList,
    PageSidebar
} from '@patternfly/react-core';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MainSidebar = ({ activeGroup, activeItem, isNavigationOpen, updateNav }) => {

    const [isExpanded, setExpanded] = useState(false);
    let history = useHistory();

    const clickHandler = (group, item, url) => {
        updateNav(group, item);
        history.push(url);
    };

    return (
        <PageSidebar
            nav = {<Nav>
                <NavList>
                    <NavExpandable 
                        title="Home" 
                        groupId={ HOME_GROUP }
                        isActive={ activeGroup === HOME_GROUP }
                        isExpanded={ isExpanded }
                        onExpand={ () => setExpanded(!isExpanded) }
                    >
                        <NavItem
                            to='/home/payloads'
                            groupId={ HOME_GROUP }
                            itemId={ PAYLOADS_ITEM }
                            preventDefault
                            isActive={ activeItem === PAYLOADS_ITEM }
                            onClick={ () => clickHandler(HOME_GROUP, PAYLOADS_ITEM, '/home/payloads') }
                        >
                            Payloads
                        </NavItem>
                        <NavItemSeparator/>
                        <NavItem
                            to='/home/track'
                            groupId={ HOME_GROUP }
                            itemId={ TRACK_ITEM }
                            preventDefault
                            isActive={ activeItem === TRACK_ITEM }
                            onClick={ () => clickHandler(HOME_GROUP, TRACK_ITEM, '/home/track') }
                        >
                            Track
                        </NavItem>
                    </NavExpandable>
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
    setActiveGroup: PropTypes.func,
    updateNav: PropTypes.func
};

const mapStateToProps = state => ({
    activeGroup: state.sidebar.activeGroup,
    activeItem: state.sidebar.activeItem,
    isNavigationOpen: state.sidebar.isNavigationOpen
});

const mapDispatchToProps = dispatch => ({
    setActiveGroup: (group) => dispatch(AppActions.setActiveGroup(group)),
    updateNav: (group, item) => dispatch([
        AppActions.setActiveGroup(group),
        AppActions.setActiveItem(item)
    ])
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebar);