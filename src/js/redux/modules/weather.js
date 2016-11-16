import { prop } from 'ramda'
import { createAction } from 'redux-actions'

// action types
const WEATHER_POWER = 'WEATHER_POWER'
const RESET_WEATHER = 'RESET_WEATHER'
const SET_RAINING_STATE = 'SET_RAINING_STATE'

// reducer
const defaultState = {
  rain: 0,
  sun: 0,
  isRaining: false
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

  case SET_RAINING_STATE:
    return {
      ...state,
      isRaining: action.payload
    }

  default:
    return state
  }
}

const sunAndRain = prop('weather')
const add = (weather) => (type, power, moves) => type === weather
  ? power + moves.length
  : power
const addRain = add('rain')
const addSun = add('sun')

// actions
export const addPowerToWeather = (weatherType) => (dispatch, getState) => {
  const state = getState()
  const { sun, rain } = sunAndRain(state)
  const { moves: { moveArray } } = state

  const newWeatherPower = {
    sun: addSun(weatherType, sun, moveArray),
    rain: addRain(weatherType, rain, moveArray)
  }

  dispatch({
    type: WEATHER_POWER,
    payload: newWeatherPower
  })
}

export const resetWeather = (weatherType) => (dispatch, getState) => {
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

export const setRainingState = createAction(SET_RAINING_STATE, x => x)
