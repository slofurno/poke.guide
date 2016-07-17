import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fakeLogin } from 'actions'

class Login extends Component {
  render() {
  const { account, fakeLogin } = this.props

    return account
      ? (
      <div>
        about you
      </div>
    ) : (
      <div>
				<div className="flex-container">
          <div className="inline-flex">
            <input type="button" value="Log In" onClick={fakeLogin}/>
          </div>
          <div className="inline-flex">
            <input type="button" value="Sign Up"/>
          </div>
        </div>
        <input type="text" className="light" placeholder="email"/>
      </div>
    )
  }
}

export default connect(state => state, {fakeLogin})(Login)
