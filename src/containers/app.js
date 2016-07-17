import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import history from 'history'
import rootReducer from 'reducers'
import Overlay from 'containers/overlay'
import Login from 'containers/login'


const store = createStore(rootReducer, applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))

const NoOp = () => null

const modalStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 10,
  background: 'rgba(0,0,0,0.3)',
}

const Modal = ({ children }) => (
  <div style={ modalStyle } onClick={() => history.push('/')}>
    { children }
  </div>
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Overlay}>
            <IndexRoute component={NoOp}/>
            <Route path="modal" component={Modal}>
              <Route path="login" component={Login}/>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

