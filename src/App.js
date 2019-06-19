import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import QueryManager from './components/QueryManager';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      payloads: [],
      count: 0,
    };
  }

  componentDidMount() {
    this.search(queryBase)
  }

  search = (query) => {
    console.log(query)
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
        <QueryManager
          payloads={this.state.payloads}
          count={this.state.count}
          search={this.search}
        />
      </div>
    )
  }
}

const queryBase = 'http://localhost:8080/v1/payloads?'

export default App;
