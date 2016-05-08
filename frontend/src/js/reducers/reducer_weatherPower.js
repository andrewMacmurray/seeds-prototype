import { WEATHER_POWER } from '../actions/actions_index.js'

const defaultState = { rain: 0, sun: 0 }

export default (state = defaultState, action) => {
  switch (action.type) {
    case WEATHER_POWER:

      const weatherType = action.payload.weatherType
      const power = action.payload.power

      if (weatherType === 'sun') {
        return { ...state, sun: state.sun + power }
      } else if (weatherType === 'rain') {
        return { ...state, rain: state.rain + power }
      }

    default:
      return state
  }
}
