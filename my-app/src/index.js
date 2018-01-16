import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

// app specific imports
import { history } from './services'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import resultsApp from './reducers/index';
import './index.css';
import App from './App';

let store = configureStore(resultsApp);

ReactDOM.render(
  <Root
    store={store}
    history={history}
    routes={routes}/>,
  document.getElementById('root')
);
registerServiceWorker();
