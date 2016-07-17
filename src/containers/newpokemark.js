import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class NewPokeMark extends Component {
  render() {
    const { mapPointer } = this.props

    return (
      <div>
        <span>x: {mapPointer.x}</span>
        <span>y: {mapPointer.y}</span>
        <input type="text" className="light" placeholder="pokemon"/>
        <input type="button" value="Submit"/>
      </div>
    )
  }
}

export default connect(state => state, {})(NewPokeMark)
