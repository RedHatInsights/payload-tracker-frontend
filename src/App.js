import '@patternfly/react-core/dist/styles/base.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Payloads from './components/Payloads';
import { Redirect } from 'react-router';
import Statuses from './components/Statuses';
import Track from './components/Track';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact render={() => <Redirect to='/payloads'/>}/>
        <Route path='/payloads' component={Payloads}/>
        <Route path='/statuses' component={Statuses}/>
        <Route exact path='/track' component={Track}/>
        <Route path='/track/:request_id' component={Track}/>
        {/* <Route path='/stats/successrates' component={SuccessRate}/> */}
      </Switch>
    )
  }
}

export default App;
