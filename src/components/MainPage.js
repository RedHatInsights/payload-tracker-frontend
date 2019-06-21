import React, { Component } from 'react';
import {
    Page,
    PageHeader, 
    PageSection,
    PageSectionVariants,
    Brand,
    Button
  } from '@patternfly/react-core';
import SearchBar from './SearchBar';
import Payloads from './Payloads';
import whLogo from './static/images/rh-logo-white.svg';

const logoProps = {
    href: '/',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
};

const header = (
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
    />
);

class MainPage extends Component {
    render() {
        return(
            <Page header={header}>
                <PageSection variant={PageSectionVariants.dark}>
                    <SearchBar 
                    search={this.props.search} 
                    filters={this.props.filters} 
                    buildQuery={this.props.buildQuery}
                    updateParameters={this.props.updateParameters}
                    />
                </PageSection>
                <PageSection variant={PageSectionVariants.light} style={{minHeight:'800px'}}>
                    <Payloads 
                    payloads={this.props.payloads} 
                    count={this.props.count}
                    page={this.props.page}
                    page_size={this.props.page_size}
                    buildQuery={this.props.buildQuery}
                    updateParameters={this.props.updateParameters}
                    />
                </PageSection>
            </Page>
        )
    }
}

export default MainPage;