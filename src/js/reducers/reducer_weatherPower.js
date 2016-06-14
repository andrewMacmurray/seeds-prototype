import { WEATHER_POWER, RESET_WEATHER } from '../actions/actionTypes.js'

const defaultState = { rain: 0, sun: 0 }

export default (state = defaultState, action) => {
  switch (action.type) {
  case WEATHER_POWER:

    const { weatherType } = action.payload

    if (weatherType === 'sun') {
      const sunPower = state.sun += 1
      return { ...state, sun: sunPower }
    }
    if (weatherType === 'rain') {
      const rainPower = state.rain += 1
      return { ...state, rain: rainPower }
    }
    return state

  case RESET_WEATHER:

    const _weatherType = action.payload

    if (_weatherType === 'sun') return { ...state, sun: 0 }
    if (_weatherType === 'rain') return { ...state, rain: 0 }
    return state

  default:
    return state
  }
}
