import * as AppActions from '../actions';

import { Nav, NavItem, NavList, PageSidebar } from '@patternfly/react-core';
import { PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from '../AppConstants'

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const MainSidebar = ({ activeItem, onClickFn, isNavOpen, setTrackRequestID }) => {

    const clickHandler = url => {
        setTrackRequestID(null);
        onClickFn(url);
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
                        onClick={ () => clickHandler('/payloads') }
                    >
                        Payloads
                    </NavItem>
                    {/* <NavItem
                        to='/statuses'
                        itemId={ STATUSES_ITEM }
                        preventDefault
                        isActive={ activeItem === STATUSES_ITEM }
                        onClick={ () => clickHandler('/statuses') }
                    >
                        Statuses
                    </NavItem> */}
                    <NavItem
                        to='/track'
                        itemId={ TRACK_ITEM }
                        preventDefault
                        isActive={ activeItem === TRACK_ITEM }
                        onClick={ () => clickHandler('/track') }
                    >
                        Track
                    </NavItem>
                </NavList>
            </Nav>}
            isNavOpen={ isNavOpen }
        />
    );
};

MainSidebar.propTypes = {
    activeItem: PropTypes.string,
    onClickFn: PropTypes.func,
    isNavOpen: PropTypes.bool,
    setTrackRequestID: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    setTrackRequestID: (item) => dispatch(AppActions.setTrackRequestID(item))
});

export default connect(undefined, mapDispatchToProps)(MainSidebar);