import { createAction } from 'redux-actions'
import { path, identity } from 'ramda'

// action types
const WEATHER_POWER = 'WEATHER_POWER'
const RESET_WEATHER = 'RESET_WEATHER'
const SET_WEATHER_TURNS = 'SET_WEATHER_TURNS'
const DECREMENT_WEATHER_TURNS = 'DECREMENT_WEATHER_TURNS'
const WEATHER_ANIMATING = 'WEATHER_ANIMATING'
const SET_RAINDROPS_VISIBILITY = 'SET_RAINDROPS_VISIBILITY'
const SET_SUN_SPHERE_VISIBILITY = 'SET_SUN_SPHERE_VISIBILITY'
const SET_WEATHER_THRESHOLD = 'SET_WEATHER_THRESHOLD'

// reducer
const defaultState = {
  rain: 0,
  sun: 0,
  threshold: 12,
  remainingWeatherTurns: 0,
  animating: false,
  raindropsVisible: false,
  sunSphereVisible: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case WEATHER_POWER:
    return {
      ...state,
      ...action.payload
    }
  case RESET_WEATHER:
    return {
      ...state,
      ...action.payload
    }
  case SET_WEATHER_TURNS:
    return {
      ...state,
      remainingWeatherTurns: action.payload
    }
  case DECREMENT_WEATHER_TURNS:
    return {
      ...state,
      remainingWeatherTurns: state.remainingWeatherTurns - 1
    }
  case WEATHER_ANIMATING:
    return {
      ...state,
      animating: action.payload
    }
  case SET_RAINDROPS_VISIBILITY:
    return {
      ...state,
      raindropsVisible: action.payload
    }
  case SET_SUN_SPHERE_VISIBILITY:
    return {
      ...state,
      sunSphereVisible: action.payload
    }
  case SET_WEATHER_THRESHOLD:
    return {
      ...state,
      threshold: action.payload
    }
  default:
    return state
  }
}

const sunAndRain = path([ 'level', 'weather' ])
const add = (weather) => (type, power, moves) => type === weather
  ? power + moves.length
  : power
const addRain = add('rain')
const addSun = add('sun')

// actions
export const addPowerToWeather = (weatherType) => (dispatch, getState) => {
  const state = getState()
  const { sun, rain } = sunAndRain(state)
  const { level: { moves: { moveArray } } } = state

  const newWeatherPower = {
    sun: addSun(weatherType, sun, moveArray),
    rain: addRain(weatherType, rain, moveArray)
  }

  dispatch({
    type: WEATHER_POWER,
    payload: newWeatherPower
  })
}

export const resetWeatherPower = (weatherType) => (dispatch, getState) => {
  const state = getState()
  const { sun, rain } = sunAndRain(state)

  const newWeatherPower = {
    sun: weatherType === 'sun' ? 0 : sun,
    rain: weatherType === 'rain' ? 0 : rain
  }
  dispatch({
    type: RESET_WEATHER,
    payload: newWeatherPower
  })
}

export const decrementWeatherTurns = () => (dispatch, getState) => {
  const state = getState()
  const { remainingWeatherTurns } = state.level.weather

  if (remainingWeatherTurns > 0) {
    dispatch({
      type: DECREMENT_WEATHER_TURNS,
      payload: null
    })
  }
}

export const weatherAnimating = createAction(WEATHER_ANIMATING, identity)
export const setRaindropsVisibility = createAction(SET_RAINDROPS_VISIBILITY, identity)
export const setWeatherTurns = createAction(SET_WEATHER_TURNS, identity)
export const setSunSphereVisibility = createAction(SET_SUN_SPHERE_VISIBILITY, identity)
export const setWeatherThreshold = createAction(SET_WEATHER_THRESHOLD, identity)
