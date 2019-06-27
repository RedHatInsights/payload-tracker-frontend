import React, {Component} from 'react';
import {Brand, Button, PageHeader} from '@patternfly/react-core';
import whLogo from './static/images/rh-logo-white.svg';

class MainHeader extends Component {

    state = {
        isOpen: true,
    }

    logoProps = {
        href: '/',
        onClick: () => console.log('clicked logo'),
        target: '_blank'
    };

    setNavStatus = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isOpen } = this.state;
        return (
            <PageHeader 
                logo={<Brand src={whLogo} alt= "Red Hat Logo White"/>}
                logoProps={this.logoProps} 
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
                onNavToggle={this.setNavStatus}
                showNavToggle={false}
                isNavOpen={isOpen}
            />
        )
    }
}

export default MainHeader;