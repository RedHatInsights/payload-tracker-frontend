import React, { Component } from 'react';
import {
    Page,
    PageHeader,
    PageSidebar,
    Brand,
    Button,
    Nav,
    NavList,
    NavItem,
    NavExpandable,
    NavItemSeparator
  } from '@patternfly/react-core';
import Track from './Track';
import Inventory from './Inventory';
import SuccessRate from './SuccessRate';
import whLogo from './static/images/rh-logo-white.svg';

const logoProps = {
    href: '/',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
};

class MainPage extends Component {

    state = {
        activeItem: 'grp1_itm1',
        activeGroup: 'grp1',
        isNavOpen: true,
    };

    onNavToggle = () => {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    };

    onSelect = result => {
        this.setState({
            activeItem: result.itemId,
            activeGroup: result.groupId,
        });
        this.forceUpdate();
    };

    header = (
        <PageHeader 
          logo={<Brand src={whLogo} alt= "Red Hat Logo White"/>}
          logoProps={logoProps} 
          toolbar={
            <Button 
              component='a' 
              variant='tertiary'
              href='https://github.com/RedHatInsights/payload-tracker#rest-api-endpoints'
              target="_blank"
            >
                API Endpoints
            </Button>
          }
          onNavToggle={this.onNavToggle}
          showNavToggle
        />
    );

    sidebar = (
        <PageSidebar
            nav={
                <Nav onSelect={this.onSelect}>
                    <NavList>
                        <NavExpandable title="Payloads" groupId="grp1" isActive={this.activeGroup === 'grp1'} isCollapsed>
                            <NavItem
                                preventDefault 
                                to="#expandable-1"
                                groupId="grp1"
                                itemId="grp1_itm1"
                                isActive={this.activeItem === 'grp1_itm1'}
                            >
                                Inventory
                            </NavItem>
                            <NavItemSeparator/>
                            <NavItem
                                preventDefault 
                                to="#expandable-1"
                                groupId="grp1"
                                itemId="grp1_itm2"
                                isActive={this.activeItem === 'grp1_itm2'}
                            >
                                Track
                            </NavItem>
                        </NavExpandable>
                        <NavExpandable title="Stats" groupId="grp2" isActive={this.activeGroup === 'grp2'} isCollapsed>
                            <NavItem 
                                preventDefault
                                groupId='grp2'
                                itemId="grp2_itm1"
                                isActive={this.activeItem === 'grp2_itm1'}
                            > 
                                Success Rates
                            </NavItem>
                        </NavExpandable>
                    </NavList>
                </Nav>
            }
            isNavOpen={this.state.isNavOpen}
        />
    );

    render() {
        if (this.state.activeGroup === 'grp1') {
            if (this.state.activeItem === 'grp1_itm1') {
                return(
                    <Page header={this.header} sidebar={this.sidebar} isManagedSidebar>
                        <Inventory/>
                    </Page>
                )
            } else if (this.state.activeItem === 'grp1_itm2') {
                return(
                    <Page header={this.header} sidebar={this.sidebar} isManagedSidebar>
                        <Track/>
                    </Page>
                )
            } 
        } else if (this.state.activeGroup === 'grp2') {
            return(
                <Page header={this.header} sidebar={this.sidebar} isManagedSidebar>
                    <SuccessRate/>
                </Page>
            )
        }
    }
}

export default MainPage;