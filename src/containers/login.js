import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    return (
      <h1>HEY</h1>
    )
  }
}

export default connect(state => state, {})(Login)
