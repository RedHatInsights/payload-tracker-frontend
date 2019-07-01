import React from 'react';
import {
    PageSidebar,
    Nav,
    NavList,
    NavExpandable,
    NavItem,
    NavItemSeparator
} from '@patternfly/react-core';
import { useStateWithSessionStorage } from './Definitions'

const MainSidebar = () => {
    return (
        <PageSidebar
            nav = {<Navigation/>}
        />
    )
}

const Navigation = () => {

    const [activeGroup, setActiveGroup] = useStateWithSessionStorage('ActiveGroup');
    const [activeItem, setActiveItem] = useStateWithSessionStorage('ActiveItem');

    return (
        <Nav>
            <NavList>
                <NavExpandable 
                    title="Home" 
                    groupId="grp1" 
                    isActive={activeGroup === 'grp1'}
                    isExpanded={activeGroup === 'grp1'}
                    onExpand={ () => setActiveGroup('grp1') }
                >
                    <NavItem
                        to='/home/payloads'
                        groupId="grp1"
                        itemId="grp1_itm1"
                        isActive={activeItem === 'grp1_itm1'}
                        onClick={ () => setActiveItem('grp1_itm1') }
                    >
                        Payloads
                    </NavItem>
                    <NavItemSeparator/>
                    <NavItem
                        to='/home/track'
                        groupId="grp1"
                        itemId="grp1_itm2"
                        isActive={activeItem === 'grp1_itm2'}
                        onClick={ () => setActiveItem('grp1_itm2') }
                    >
                        Track
                    </NavItem>
                </NavExpandable>
                {/* <NavExpandable 
                    title="Stats" 
                    groupId="grp2" 
                    isActive={activeGroup === 'grp2'}
                    isExpanded={activeGroup === 'grp2'}
                    onExpand={ () => setActiveGroup('grp2') }
                >
                    <NavItem 
                        to='/stats/successrates'
                        groupId="grp2"
                        itemId="grp2_itm1"
                        isActive={activeItem === 'grp2_itm1'}
                        onClick={ () => setActiveItem('grp2_itm1') }
                    > 
                        Success Rates
                    </NavItem>
                </NavExpandable> */}
            </NavList>
        </Nav>
    )
}

export default MainSidebar;