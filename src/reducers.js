import { combineReducers } from 'redux'

import {
  OVERLAY_CLICKED,
} from './actions'

function overlay(state = false, action) {
  switch(action.type) {
  case OVERLAY_CLICKED:
    return !state
  default:
    return state
  }
}

const rootReducer = combineReducers({
  overlay
})

export default rootReducer
