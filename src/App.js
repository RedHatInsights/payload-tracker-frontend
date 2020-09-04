import './App.scss';

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';
import { PAYLOADS_ITEM } from './AppConstants';
import { Page } from '@patternfly/react-core';
import Payloads from './components/Payloads/Payloads';
import { Redirect } from 'react-router';
import Statuses from './components/Statuses/Statuses';
import Track from './components/Track/Track';

const App = () => {

  const [isNavOpen, toggleNav] = useState(false);
  const [activeItem, setActiveItem] = useState(PAYLOADS_ITEM)

  return <Page
    header={<MainHeader isNavOpen={isNavOpen} toggleNav={toggleNav}/>}
    sidebar={<MainSidebar activeItem={activeItem} setActiveItem={setActiveItem} isNavOpen={isNavOpen}/>}
  >
    <Switch>
      <Route path='/' exact render={() => <Redirect to='/payloads'/>}/>
      <Route path='/payloads' component={Payloads}/>
      <Route path='/statuses' component={Statuses}/>
      <Route exact path='/track' component={Track}/>
      <Route path='/track/:request_id' component={Track}/>
    </Switch>
  </Page>;

};

export default App;
