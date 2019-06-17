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
    }
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
    )
  }

  componentDidMount() {
    this.search()
  }

  search = (query) => {
    console.log(query)
    fetch(query)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          payloads: result
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  generateRows = () => {
    var rows = [];
    Object.values(this.state.payloads).forEach(payload => {
        var row = [];
        Object.values(payload).forEach(entry => {
            row.push(entry)
        })
        rows.push(row)
    })
    return (rows);
  }


  render() {
    return (
      <div className="App">
        <Page header={this.header}>
          <PageSection variant={PageSectionVariants.dark}>
            <SearchBar search={this.search}/>
          </PageSection>
          <PageSection variant={PageSectionVariants.light} style={{minHeight:'800px'}}>
            <Payloads payloads={this.state.payloads} rows={this.generateRows()}/>
          </PageSection>
        </Page>
      </div>
    )
  }
}

const logoProps = {
  href: 'http://localhost:3001',
  onClick: () => console.log('clicked logo'),
  target: '_blank'
};

export default App;
