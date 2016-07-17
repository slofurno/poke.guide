import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import history from 'history'

import {
  overlayClicked,
} from 'actions'

const menuStyle = {
  height: 60,
  background: 'indianred',
  position: 'fixed',
  width: '100vw',
  top: 0,
  display: 'flex',
  padding: '10px 0'
}

const searchStyle = {
  display: 'flex',
  flex: '1 1 auto',
  borderBottom: '2px solid white',
  margin: '0 10%',
  color: 'white',
}

const endStyle = {
  display: 'flex',
  flex: '0 0 auto',
  color: 'white',
  width: 60,
  fontSize: '2em',
}


class Overlay extends Component {
  render() {
    const { children, overlay, overlayClicked } = this.props

    return (
      <div>
        <div style={menuStyle}>
          <div style={searchStyle}>
            <i className="material-icons md-36 md-light">search</i>
            <input type="text" placeholder="pokemon"/>
          </div>
          <div style={endStyle}>
            <i className="material-icons md-36 md-light" onClick={() => history.push('/modal/login')}>menu</i>
          </div>
        </div>

        { children }
      </div>
    )
  }
}

export default connect(state => state, {overlayClicked})(Overlay)
