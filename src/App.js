import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import MainPage from './components/MainPage';

class App extends Component {

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
  }

  componentDidMount() {
    this.search(queryBase)
  }

  updateParameters = (newParam) => {
    if (newParam.name === 'page') {
      this.queryParameters.page = newParam.value
    }
    if (newParam.name === 'page_size') {
      this.queryParameters.page_size = newParam.value
    }
    if (newParam.name === 'Sort Dir') {
      this.queryParameters.sort_dir = newParam.value
    }
    if (newParam.name === 'Sort By') {
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
        <MainPage 
          updateParameters={this.updateParameters}
          buildQuery={this.buildQuery}
          filters={this.queryParameters.filters}
          page={this.queryParameters.page}
          page_size={this.queryParameters.page_size}
          payloads={this.state.payloads}
          count={this.state.count}
        />
      </div>
    )
  }
}

const queryBase = 'http://localhost:8080/v1/payloads?'

export default App;
