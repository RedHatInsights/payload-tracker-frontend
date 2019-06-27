import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Track from './components/Track';
import Inventory from './components/Inventory';
import SuccessRate from './components/SuccessRate';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Inventory}/>
            <Route path='/payloads/inventory' component={Inventory}/>
            <Route path='/payloads/track' component={Track}/>
            <Route path='/stats/successrates' component={SuccessRate}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
