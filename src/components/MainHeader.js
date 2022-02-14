import { PageHeader, PageHeaderTools } from '@patternfly/react-core';

import DateRangeFilter from './DateFilter/DateRangeFilter';
import PropTypes from 'prop-types';
import React from 'react';

const MainHeader = ({ isNavOpen, toggleNav, pathname }) => {
    return <PageHeader
        logo={<img src="/public/rh-new-logo.svg" />}
        logoProps={{
            href: '/payloads',
            target: '_blank'
        }}
        headerTools={ <PageHeaderTools>
            {!pathname.includes('/track') ? <DateRangeFilter/> : undefined}
        </PageHeaderTools> }
        onNavToggle={ () => toggleNav(!isNavOpen) }
        showNavToggle
    />;
};

MainHeader.propTypes = {
    isNavOpen: PropTypes.bool,
    toggleNav: PropTypes.func,
    pathname: PropTypes.string
};

export default (MainHeader);
