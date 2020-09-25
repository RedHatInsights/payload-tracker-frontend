import { PageHeader, PageHeaderTools } from '@patternfly/react-core';

import DateRangeFilter from './DateFilter/DateRangeFilter';
import PropTypes from 'prop-types';
import React from 'react';
import newlogo from '../static/images/rh-new-logo.svg';

const MainHeader = ({ isNavOpen, toggleNav, pathname }) => {

    return <PageHeader
        logo={<span dangerouslySetInnerHTML={{ __html: newlogo }} />}
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
