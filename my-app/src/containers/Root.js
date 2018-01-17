import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import RouterContext from 'react-router/lib'
import DevTools from './DevTools'
import App from '../App';
// import AddressPage from './containers/AddressPage';
// import AddResult from './AddResult';
import Entry from '../components/Entry'

export default class Root extends Component {
  render() {
    const { store, history, routes, type, renderProps } = this.props

    return (
      <Provider store={store}>
        <div>

          <Router history={history}>
            <Route path="/" component={App}>
              {/* <Route path="/:address"
                     component={AddressPage} /> */}
              <Route path="/result" component={Entry} />
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.node.isRequired
}
