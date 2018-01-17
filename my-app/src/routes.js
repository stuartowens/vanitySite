import React from 'react';
import { Route } from 'react-router';
import App from './App';
// import AddressPage from './containers/AddressPage';
import AddResult from './containers/AddResult';

export default (
  <Route path="/" component={App}>
    {/* <Route path="/:address"
           component={AddressPage} /> */}
    <Route path="/:result"
           component={AddResult} />
  </Route>
)
