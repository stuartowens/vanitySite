import React from 'react';
import { Route } from 'react-router';
import App from './App';
// import AddressPage from './containers/AddressPage';
import ResultsContainer from './containers/ResultsContainer';

export default (
  <Route path="/" component={App}>
    {/* <Route path="/:address"
           component={AddressPage} /> */}
    <Route path="/:results"
           component={ResultsContainer} />
  </Route>
)
