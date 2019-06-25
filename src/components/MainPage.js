import React, { Component } from 'react';
import {
    Page,
    PageHeader,
    Brand,
    Button,
    Nav,
    NavVariants,
    NavList,
    NavItem
  } from '@patternfly/react-core';
import Track from './Track';
import Inventory from './Inventory';
import whLogo from './static/images/rh-logo-white.svg';

const logoProps = {
    href: '/',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
};

class MainPage extends Component {

    state = {
        activeItem: 0,
    };

    onSelect = result => {
        this.setState({
            activeItem: result.itemId
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
          topNav={
            <Nav onSelect={this.onSelect}>
                <NavList variant={NavVariants.horizontal}>
                    <NavItem preventDefault itemId={0}>
                        Inventory
                    </NavItem>
                    <NavItem preventDefault itemId={1}>
                        Track
                    </NavItem>
                </NavList>
            </Nav>
          }
        />
    );

    render() {
        if (this.state.activeItem === 0) {
            return(
                <Page header={this.header}>
                    <Inventory 
                        payloads={this.props.payloads}
                        search={this.props.search}
                    />
                </Page>
            )
        } else {
            return(
                <Page header={this.header}>
                    <Track 
                        payloads={this.props.payloads}
                        count={this.props.count}
                        search={this.props.search}
                    />
                </Page>
            )
        }
    }
}

export default MainPage;