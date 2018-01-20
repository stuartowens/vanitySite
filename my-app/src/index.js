import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

// app specific imports
import { history } from './services';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './index.css';
import { AvailabilityFilters } from './actions';
import rootSaga from './sagas';
const { SHOW_ALL } = AvailabilityFilters;

const initialState = {
  availabilityFilter: SHOW_ALL,
  errorMessage: '',
  router: {},
  results: [
    {
      text: '1800-BailBond',
      available: true,
    },
  ],
};

let store = configureStore(window.__INITIAL_STATE__);
// store.runSaga(rootSaga)

ReactDOM.render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
);
registerServiceWorker();
