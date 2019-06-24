import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage/>
      </div>
    )
  }
}

export default App;
