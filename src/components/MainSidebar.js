import React from 'react';
import {
    PageSidebar,
    Nav,
    NavList,
    NavExpandable,
    NavItem,
    NavItemSeparator
} from '@patternfly/react-core';
import { setActiveGroup, setActiveItem } from '../actions';
import { HOME_GROUP, TRACK_ITEM, PAYLOADS_ITEM } from '../AppConstants'
import { push } from 'connected-react-router';

const MainSidebar = props => {
    return (
        <PageSidebar
            nav = {
                <Navigation {...props}/>
            }
            isNavOpen={props.isNavigationOpen}
        />
    )
}

const clickHandler = (props, group, item, url)  => {
    return function () {
        props.dispatch(setActiveGroup(group));
        props.dispatch(setActiveItem(item));
        props.dispatch(push(url));
        props.history.push(url);
    }
}

const Navigation = (props) => {
    return (
        <Nav>
            <NavList>
                <NavExpandable 
                    title="Home" 
                    groupId={HOME_GROUP}
                    isActive={props.activeGroup === HOME_GROUP}
                    isExpanded={props.activeGroup === HOME_GROUP}
                    onExpand={ () => props.dispatch(setActiveGroup(HOME_GROUP)) }
                >
                    <NavItem
                        to='/home/payloads'
                        groupId={HOME_GROUP}
                        itemId={PAYLOADS_ITEM}
                        preventDefault
                        isActive={props.activeItem === PAYLOADS_ITEM}
                        onClick={ clickHandler(props, HOME_GROUP, PAYLOADS_ITEM, '/home/payloads') }
                    >
                        Payloads
                    </NavItem>
                    <NavItemSeparator/>
                    <NavItem
                        to='/home/track'
                        groupId={HOME_GROUP}
                        itemId={TRACK_ITEM}
                        preventDefault
                        isActive={props.activeItem === TRACK_ITEM}
                        onClick={ clickHandler(props, HOME_GROUP, TRACK_ITEM, '/home/track') }
                    >
                        Track
                    </NavItem>
                </NavExpandable>
                {/* <NavExpandable 
                    title="Stats" 
                    groupId="grp2" 
                    isActive={props.activeGroup === 'grp2'}
                    isExpanded={props.activeGroup === 'grp2'}
                    onExpand={ () => props.dispatch(setActiveGroup('grp2')) }
                >
                    <NavItem 
                        to='/stats/successrates'
                        groupId="grp2"
                        itemId="grp2_itm1"
                        preventDefault
                        isActive={props.activeItem === 'grp2_itm1'}
                        onClick={ clickHandler(props, 'grp2', 'itm1', '/stats/successrates') }
                    > 
                        Success Rates
                    </NavItem>
                </NavExpandable> */}
            </NavList>
        </Nav>
    )
}

export default MainSidebar;