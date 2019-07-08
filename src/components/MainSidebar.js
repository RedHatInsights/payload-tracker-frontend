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
        props.dispatch(setActiveGroup(`${group}`))
        props.dispatch(setActiveItem(`${group}_${item}`))
        props.history.push(url)
    }
}

const Navigation = (props) => {
    return (
        <Nav>
            <NavList>
                <NavExpandable 
                    title="Home" 
                    groupId="grp1" 
                    isActive={props.activeGroup === 'grp1'}
                    isExpanded={props.activeGroup === 'grp1'}
                    onExpand={ () => props.dispatch(setActiveGroup('grp1'))}
                >
                    <NavItem
                        to='/home/payloads'
                        groupId="grp1"
                        itemId="grp1_itm1"
                        preventDefault
                        isActive={props.activeItem === 'grp1_itm1'}
                        onClick={ clickHandler(props, 'grp1', 'itm1', '/home/payloads') }
                    >
                        Payloads
                    </NavItem>
                    <NavItemSeparator/>
                    <NavItem
                        to='/home/track'
                        groupId="grp1"
                        itemId="grp1_itm2"
                        preventDefault
                        isActive={props.activeItem === 'grp1_itm2'}
                        onClick={ clickHandler(props, 'grp1', 'itm2', '/home/track') }
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