import React from 'react';
import { Route } from 'react-router';
import App from './App';
// import AddressPage from './containers/AddressPage';
import AddResult from './containers/AddResult';
import AddressPage from './containers/AddressPage';

export default (
  <Route path="/" component={App}>
    <Route path="/:result" component={AddResult} />
    <Route path="/address" component={AddressPage} />
  </Route>
);
