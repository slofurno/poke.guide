import { combineReducers } from 'redux'

import {
  OVERLAY_CLICKED,
  LOGIN_SUCCESS,
  MAP_CLICKED,
} from './actions'

function overlay(state = false, action) {
  switch(action.type) {
  case OVERLAY_CLICKED:
    return !state
  default:
    return state
  }
}

function account(state = null, action) {
  switch(action.type) {
  case LOGIN_SUCCESS:
    return action.email
  default:
    return state
  }
}

function mapPointer(state = {x: -1, y: -1}, action) {
  switch(action.type) {
  case MAP_CLICKED:
    return action.location
  default:
    return state
  }
}

const rootReducer = combineReducers({
  overlay,
  account,
  mapPointer,
})

export default rootReducer
