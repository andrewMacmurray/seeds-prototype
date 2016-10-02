import { lensProp, view } from 'ramda'

// action types
const WEATHER_POWER = 'WEATHER_POWER'
const RESET_WEATHER = 'RESET_WEATHER'

// reducer
const defaultState = { rain: 0, sun: 0 }
export default (state = defaultState, action) => {
  switch (action.type) {
  case WEATHER_POWER:
    return action.payload

  case RESET_WEATHER:
    return action.payload

  default:
    return state
  }
}

const sunAndRain = view(lensProp('weather'))
const add = (weather) => (type, x) => type === weather ? x + 1 : x
const addRain = add('rain')
const addSun = add('sun')

// actions
export const addPowerToWeather = (weatherType) => (dispatch, getState) => {
  const state = getState()
  const { sun, rain } = sunAndRain(state)
  const { moves: { moveArray } } = state

  const addPower = {
    sun: addSun(weatherType, sun),
    rain: addRain(weatherType, rain)
  }

  const newWeatherPower = moveArray.length > 1
    ? addPower
    : { sun, rain }

  dispatch({
    type: WEATHER_POWER,
    payload: newWeatherPower
  })
}

export const resetWeather = (weatherType) => (dispatch, getState) => {
  const { sun, rain } = sunAndRain(getState())
  const newWeatherPower = {
    sun: weatherType === 'sun' ? 0 : sun,
    rain: weatherType === 'rain' ? 0 : rain
  }
  dispatch({
    type: RESET_WEATHER,
    payload: newWeatherPower
  })
}
