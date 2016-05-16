import { WEATHER_POWER, RESET_WEATHER } from '../actions/actionTypes.js'

const defaultState = { rain: 0, sun: 0 }

export default (state = defaultState, action) => {
  switch (action.type) {
    case WEATHER_POWER:

      const weatherType = action.payload.weatherType
      const power = action.payload.power

      if (weatherType === 'sun') return { ...state, sun: state.sun + power }
      if (weatherType === 'rain') return { ...state, rain: state.rain + power }

    case RESET_WEATHER:

      const _weatherType = action.payload

      if (_weatherType === 'sun') return { ...state, sun: 0 }
      if (_weatherType === 'rain') return { ...state, rain: 0 }

    default:
      return state
  }
}
