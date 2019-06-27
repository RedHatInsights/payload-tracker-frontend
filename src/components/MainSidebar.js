import React, { Component } from 'react';
import {
    PageSidebar,
    Nav,
    NavList,
    NavExpandable,
    NavItem,
    NavItemSeparator
} from '@patternfly/react-core';

const MainSidebar = () => {
    return (
        <PageSidebar
            nav = {<Navigation/>}
        />
    )
}

class Navigation extends Component {

    state = {
        activeGroup: 'grp1',
        activeItem: 'grp1_itm1'
    }

    onSelect = result => {
        this.setState({
            activeItem: result.itemId,
            activeGroup: result.groupId,
        });
        this.forceUpdate();
    }

    render() {
        return (
            <Nav>
                <NavList>
                    <NavExpandable title="Payloads" groupId="grp1" isActive={this.activeGroup === 'grp1'}>
                        <NavItem
                            to='/payloads/inventory'
                            groupId="grp1"
                            itemId="grp1_itm1"
                            isActive={this.activeItem === 'grp1_itm1'}
                        >
                            Inventory
                        </NavItem>
                        <NavItemSeparator/>
                        <NavItem
                            to='/payloads/track'
                            groupId="grp1"
                            itemId="grp1_itm2"
                            isActive={this.activeItem === 'grp1_itm2'}
                        >
                            Track
                        </NavItem>
                    </NavExpandable>
                    <NavExpandable title="Stats" groupId="grp2" isActive={this.activeGroup === 'grp2'}>
                        <NavItem 
                            to='/stats/successrates'
                            groupId="grp2"
                            itemId="grp2_itm1"
                            isActive={this.activeItem === 'grp2_itm1'}
                        > 
                            Success Rates
                        </NavItem>
                    </NavExpandable>
                </NavList>
            </Nav>
        )
    }
}

export default MainSidebar;