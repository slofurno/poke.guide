import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import history from 'history'
import Overlay from 'containers/overlay'
import NewPokeMark from 'containers/newpokemark'
import Login from 'containers/login'
import store from 'store'

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

const modalContent = {
  background: 'white',
  color: 'black',
  margin: '110px auto 0',
  height: '100%',
  padding: 10,
  maxWidth: '720px',
}

const Modal = React.createClass({
  overlayClick({target}) {
    for(let node = target; node; node = node.parentNode) {
      if (node === this.refs.content) return
    }

    history.push('/')
  },

  render() {
    return (
      <div style={ modalStyle } onClick={ this.overlayClick }>
        <ReactCSSTransitionGroup transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div ref="content" key="modalContent" style={ modalContent }>
          { this.props.children }
        </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  },
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Overlay}>
            <IndexRoute component={NoOp}/>
            <Route path="modal" component={Modal}>
              <Route path="login" component={Login}/>
              <Route path="pokemark/new" component={NewPokeMark}/>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

