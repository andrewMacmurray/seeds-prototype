export const SET_DRAG = 'SET_DRAG'

export function setDrag (bool) {
  return {
    type: SET_DRAG,
    payload: bool
  }
}

export const UPDATE_SCORE = 'UPDATE_SCORE'

export function updateScore (tileType, moves) {
  return {
    type: UPDATE_SCORE,
    payload: { moves, tileType }
  }
}

export const WEATHER_POWER = 'WEATHER_POWER'

export function addPowerToWeather (weatherType, power) {
  return {
    type: WEATHER_POWER,
    payload: { weatherType, power }
  }
}

export const RESET_WEATHER = 'RESET_WEATHER'

export function resetWeather (weatherType) {
  return {
    type: RESET_WEATHER,
    payload: weatherType
  }
}
