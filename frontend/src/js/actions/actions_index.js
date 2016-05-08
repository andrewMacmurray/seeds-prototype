export const SET_DRAG = 'SET_DRAG'

export function setDrag (bool) {
  return {
    type: SET_DRAG,
    payload: bool
  }
}

export const WEATHER_POWER = 'WEATHER_POWER'

export function addPowerToWeather (weatherType, power) {
  return {
    type: WEATHER_POWER,
    payload: {
      weatherType,
      power
    }
  }
}
