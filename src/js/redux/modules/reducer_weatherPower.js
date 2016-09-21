import { WEATHER_POWER, RESET_WEATHER } from '../../actions/actionTypes.js'

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
