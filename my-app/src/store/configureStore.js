import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import DevTools from '../containers/DevTools';
import resultsApp from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    resultsApp,
    initialState,
    applyMiddleware(sagaMiddleware),
    // compose(
    //   applyMiddleware(sagaMiddleware),
    //   createLogger,
    // ),
    DevTools.instrument()
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  // store.runSaga = sagaMiddleware.run
  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);
  return store;
}
