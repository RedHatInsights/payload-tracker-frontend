import React from 'react';
import {Brand, Button, PageHeader} from '@patternfly/react-core';
import whLogo from './static/images/rh-logo-white.svg';
import { toggleNav } from '../actions';


const logoProps = {
    href: '/',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
};

const MainHeader = props => {
    return (
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
            onNavToggle={ () => props.dispatch(toggleNav(props.isNavigationOpen)) }
            showNavToggle
        />
    )
}

export default MainHeader;