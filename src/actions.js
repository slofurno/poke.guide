export const OVERLAY_CLICKED = 'OVERLAY_CLICKED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const MAP_CLICKED = 'MAP_CLICKED'
let pokeclient = {}

export function setPokeClient(client) {
  pokeclient = client
}

export function overlayClicked() {
  return {
    type: OVERLAY_CLICKED
  }
}

export function fakeLogin() {
  return {
    type: LOGIN_SUCCESS,
    email: "fake@email.com",
  }
}

export function changeMapFocus(location) {
  return {
    type: MAP_CLICKED,
    location
  }
}
