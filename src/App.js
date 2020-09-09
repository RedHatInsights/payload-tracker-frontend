import './App.scss';

import { PAYLOADS_ITEM, STATUSES_ITEM, TRACK_ITEM } from './AppConstants';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';
import { Page } from '@patternfly/react-core';
import Payloads from './components/Payloads/Payloads';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Statuses from './components/Statuses/Statuses';
import Track from './components/Track/Track';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const App = ({ pathname, push }) => {

  const [isNavOpen, toggleNav] = useState(false);
  const [activeItem, setActiveItem] = useState(PAYLOADS_ITEM);

  useEffect(() => {
    pathname.indexOf('/track') >= 0 ? setActiveItem(TRACK_ITEM): (
      pathname === '/payloads' ? setActiveItem(PAYLOADS_ITEM) :
      setActiveItem(STATUSES_ITEM)
    );
  }, [pathname]);

  return <Page
    header={<MainHeader isNavOpen={isNavOpen} toggleNav={toggleNav} pathname={pathname}/>}
    sidebar={<MainSidebar activeItem={activeItem} onClickFn={push} isNavOpen={isNavOpen}/>}
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

App.propTypes = {
  pathname: PropTypes.string,
  push: PropTypes.func
};

export default connect((state) => ({
  pathname: state.router.location.pathname
}), (dispatch) => ({
  push: url => dispatch(push(url))
}))(App);
