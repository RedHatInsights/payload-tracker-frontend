import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Track from './components/Track';
import Payloads from './components/Payloads';
import SuccessRate from './components/SuccessRate';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/home/payloads' component={Payloads}/>
          <Route exact path='/home/track' component={Track}/>
          <Route path='/home/track/:payload_id' component={Track}/>
          {/* <Route path='/stats/successrates' component={SuccessRate}/> */}
          <Redirect from="/" to="/home/payloads"/>
        </Switch>
      </Router>
    )
  }
}

export default App;
