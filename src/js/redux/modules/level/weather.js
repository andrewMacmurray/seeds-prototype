import { path } from 'ramda'
import { createAction } from 'redux-actions'

// action types
const WEATHER_POWER = 'WEATHER_POWER'
const RESET_WEATHER = 'RESET_WEATHER'
const WEATHER_ANIMATING = 'WEATHER_ANIMATING'
const SET_RAINDROPS_VISIBILITY = 'SET_RAINDROPS_VISIBILITY'
const SET_WEATHER_THRESHOLD = 'SET_WEATHER_THRESHOLD'

// reducer
const defaultState = {
  rain: 0,
  sun: 0,
  weatherThreshold: 12,
  animating: false,
  raindropsVisible: false
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

  case SET_WEATHER_THRESHOLD:
    return {
      ...state,
      weatherThreshold: action.payload
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

export const weatherAnimating = createAction(WEATHER_ANIMATING, x => x)
export const setRaindropsVisibility = createAction(SET_RAINDROPS_VISIBILITY, x => x)
export const setWeatherThreshold = createAction(SET_WEATHER_THRESHOLD, x => x)
