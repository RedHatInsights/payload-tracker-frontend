import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { Router, Route, Switch } from 'react-router-dom';
import Track from './components/Track';
import Inventory from './components/Inventory';
import SuccessRate from './components/SuccessRate';
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
            <Route exact path='/' component={Inventory}/>
            <Route path='/payloads/inventory' component={Inventory}/>
            <Route exact path='/payloads/track' component={Track}/>
            <Route exact path='/payloads/track/:payload_id' component={Track}/>
            <Route path='/payloads/track/:payload_id/:sort_by/:sort_dir' component={Track}/>
            {/* <Route path='/stats/successrates' component={SuccessRate}/> */}
        </Switch>
      </Router>
    )
  }
}

export default App;
