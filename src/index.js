import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import throttle from 'lodash/throttle'

import App from './containers/app'
import store from 'store'
import { changeMapFocus, setPokeClient } from 'actions'
import { pokemon, pokeimgs } from './poke'

const client = PokeClient()
setPokeClient(client)
const _pokemarks = {}

const styles = [
  {
    featureType: "all",
    stylers: [
      { saturation: -50 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },
]

window.initMap = initMap
function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const center = {lat: position.coords.latitude, lng: position.coords.longitude}
    console.log(center)
    const map = new google.maps.Map(document.getElementById('map-root'), {
      zoom: 12,
      center,
      styles,
    })

    function createMark({x, y}) {
      let position = {lat: y, lng: x}
      let r = Math.random() * 151 | 0
      return new google.maps.Marker({
        position,
        map: map,
        icon: {
          scaledSize: new google.maps.Size(40, 40),
          url: `/images/${pokeimgs[r]}.png`,
        },
      })
    }

    map.addListener('bounds_changed', throttle(function() {
      client.getMarks(getRect(map))
        .then(marks => marks.forEach(({account, id, location, time}) =>
          _pokemarks[id] || (_pokemarks[id] = createMark(location))))
    }, 500, {leading: false}))

    map.addListener('click', function(e) {
      const loc = {
        x: e.latLng.lng(),
        y: e.latLng.lat(),
      }
      store.dispatch(changeMapFocus(loc))

      client.postMark(loc)
        .then(({id, x, y}) => _pokemarks[id] ||( _pokemarks[id] = createMark({x, y})))
    })
  })
}

function getRect(map) {
  const bounds = map.getBounds()
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();
  return {
    x0: sw.lng(),
    x1: ne.lng(),
    y0: sw.lat(),
    y1: ne.lat(),
  }
}

function PokeClient() {
  function getMarks({x0, x1, y0, y1}) {
    return fetch(`/api/marks?x0=${x0}&x1=${x1}&y0=${y0}&y1=${y1}`)
      .then(res => res.json())
      .then(res => console.log(res) || res)
      .catch(err => console.error(err))
  }

  function postMark({x, y}) {
    const options = {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({x, y}),
    }
    return fetch('/api/marks', options)
      .then(res => res.json())
      .then(res => console.log(res) || res)
      .catch(err => console.error(err))
  }

  return {
    getMarks,
    postMark,
  }
}

render(<App/>, document.getElementById('root'))
