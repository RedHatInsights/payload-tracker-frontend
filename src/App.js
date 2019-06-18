import React, { Component } from 'react';
import Payloads from './components/Payloads';
import SearchBar from './components/SearchBar';
import {
  Page,
  PageHeader, 
  PageSection,
  PageSectionVariants,
  Brand,
  Button
} from '@patternfly/react-core';
import whLogo from './static/images/rh-logo-white.svg';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      payloads: [],
      count: 0,
    };
    this.queryParameters = {
      filters: [],
      page: 1,
      page_size: 20,
      sort_dir: 'asc',
      sort_by: 'payload_id'
    };
    this.header = (
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
  }

  componentDidMount() {
    this.search()
  }

  updateParameters = (newParam) => {
    if (newParam.name === 'page') {
      this.queryParameters.page = newParam.value
    }
    if (newParam.name === 'page_size') {
      this.queryParameters.page_size = newParam.value
    }
    if (newParam.name === 'sort_dir') {
      this.queryParameters.sort_dir = newParam.value
    }
    if (newParam.name === 'sort_by') {
      this.queryParameters.sort_by = newParam.value
    }
  }

  buildQuery = (payload_id) => {
    var query = queryBase;
    if(payload_id) {
      query = `http://localhost:8080/v1/payloads/${payload_id}?`
    } else {
      Object.entries(this.queryParameters).forEach(([param, value]) => {
        if (param === 'filters'){
          Object.values(value).forEach(filter => {
            query = query + `${filter.key}=${filter.value}&`
          });
        } else if (param === 'page') {
          // Must include -1 since pages start at 0 in API and at 1 in pagination
          query = query + `${param}=${value - 1}&`
        } else {
          query = query + `${param}=${value}&`
        }
      });
    }
    this.search(query);
  }

  search = (query) => {
    fetch(query)
    .then(res => res.json())
    .then(
      (result) => {
        if('count' in result){
          this.setState({
            payloads: result.data,
            count: result.count,
          });
        } else {
          this.setState({
            payloads: result,
          });
        }
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
    .then(this.forceUpdate())
  }

  render() {
    return (
      <div className="App">
        <Page header={this.header}>
          <PageSection variant={PageSectionVariants.dark}>
            <SearchBar 
              search={this.search} 
              filters={this.queryParameters.filters} 
              buildQuery={this.buildQuery}
              updateParameters={this.updateParameters}
            />
          </PageSection>
          <PageSection variant={PageSectionVariants.light} style={{minHeight:'800px'}}>
            <Payloads 
              payloads={this.state.payloads} 
              count={this.state.count}
              page={this.queryParameters.page}
              page_size={this.queryParameters.page_size}
              buildQuery={this.buildQuery}
              updateParameters={this.updateParameters}
            />
          </PageSection>
        </Page>
      </div>
    )
  }
}

const queryBase = 'http://localhost:8080/v1/payloads?'

const logoProps = {
  href: 'http://localhost:3001',
  onClick: () => console.log('clicked logo'),
  target: '_blank'
};

export default App;
