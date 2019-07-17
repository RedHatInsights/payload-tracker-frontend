import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import { MAP_STATE_TO_PROPS } from '../AppConstants';
import SearchBar from './SearchBar';
import PayloadsPagination from './PayloadsPagination';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import { connect } from 'react-redux';

const queryBase = 'http://localhost:8080/v1/payloads?';

class Payloads extends Component {
    render() {
        return(
            <Page 
                header={<MainHeader {...this.props} />} 
                sidebar={<MainSidebar {...this.props} />} 
                isManagedSidebar
            >
                <PageSection variant={PageSectionVariants.dark}>
                    <SearchBar
                        filters={this.props.payloadsParams.filters}
                        dispatch={this.props.dispatch}
                    />
                </PageSection>
                <PageSection variant={PageSectionVariants.light} style={{height:'80vh', maxWidth:'100vw', overflow:'auto'}}>
                    <PayloadsPagination
                        page={this.props.payloadsParams.page}
                        page_size={this.props.payloadsParams.page_size}
                        sort_by={this.props.payloadsParams.sort_by}
                        sort_dir={this.props.payloadsParams.sort_dir}
                        {...this.props}
                    />
                </PageSection>
            </Page>
        )
    }
}

export default connect(MAP_STATE_TO_PROPS)(Payloads);