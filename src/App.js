import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Track from './components/Track';
import Payloads from './components/Payloads';
import SuccessRate from './components/SuccessRate';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact render={() => <Redirect to='/home/payloads'/>}/>
        <Route path='/home/payloads' component={Payloads}/>
        <Route exact path='/home/track' component={Track}/>
        <Route path='/home/track/:payload_id' component={Track}/>
        {/* <Route path='/stats/successrates' component={SuccessRate}/> */}
      </Switch>
    )
  }
}

export default App;
