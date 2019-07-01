import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { Router, Route, Switch } from 'react-router-dom';
import Track from './components/Track';
import Payloads from './components/Payloads';
import SuccessRate from './components/SuccessRate';
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
            <Route exact path='/' component={Payloads}/>
            <Route path='/home/payloads' component={Payloads}/>
            <Route exact path='/home/track' component={Track}/>
            <Route path='/home/track/:payload_id' component={Track}/>
            {/* <Route path='/stats/successrates' component={SuccessRate}/> */}
        </Switch>
      </Router>
    )
  }
}

export default App;
