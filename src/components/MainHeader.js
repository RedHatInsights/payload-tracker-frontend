import * as AppActions from '../actions';

import {Brand, Button, PageHeader} from '@patternfly/react-core';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import newlogo from './static/images/rh-new-logo.svg';

const MainHeader = ({ isNavigationOpen, toggleNav }) => {
    return (
        <PageHeader 
            logo={<Brand src={newlogo} alt= "Red Hat Logo White"/>}
            logoProps={{
                href: '/home/payloads',
                target: '_blank'
            }}
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
            onNavToggle={ () => toggleNav(isNavigationOpen) }
            showNavToggle
        />
    )
}

MainHeader.propTypes = {
    isNavigationOpen: PropTypes.bool,
    toggleNav: PropTypes.func
};

const mapStateToProps = state => ({
    isNavigationOpen: state.sidebar.isNavigationOpen
});

const mapDispatchToProps = dispatch => ({
    toggleNav: (bool) => dispatch(AppActions.toggleNav(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);