import {
    Masthead, MastheadToggle, MastheadMain, MastheadBrand, MastheadContent,
    PageToggleButton, Toolbar, ToolbarContent, ToolbarGroup
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons';

import DateRangeFilter from './DateFilter/DateRangeFilter';
import PropTypes from 'prop-types';
import React from 'react';

import rhLogo from '../static/images/rh-new-logo.svg';

const MainHeader = ({ isNavOpen, toggleNav, pathname }) => {
    return <Masthead>
        <MastheadMain>
            <MastheadToggle>
                <PageToggleButton
                    variant="plain"
                    aria-label="Global navigation"
                    isSidebarOpen={isNavOpen}
                    onSidebarToggle={() => toggleNav(!isNavOpen)}
                >
                    <BarsIcon />
                </PageToggleButton>
            </MastheadToggle>
            <MastheadBrand>
                <a href="/app/payload-tracker/payloads">
                    <img src={rhLogo} alt="Red Hat Logo" style={{ height: '36px' }} />
                </a>
            </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
            <Toolbar isFullHeight isStatic>
                <ToolbarContent>
                    <ToolbarGroup align={{ default: 'alignEnd' }}>
                        {!pathname.includes('/track') ? <DateRangeFilter/> : null}
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
        </MastheadContent>
    </Masthead>;
};

MainHeader.propTypes = {
    isNavOpen: PropTypes.bool,
    toggleNav: PropTypes.func,
    pathname: PropTypes.string
};

export default (MainHeader);
