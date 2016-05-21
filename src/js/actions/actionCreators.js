import * as action from './actionTypes.js'

export function setDrag (bool, tile) {
  return { type: action.SET_DRAG, payload: { isDragging: bool, tile } }
}

export function startDrag (tile) {
  return { type: action.START_DRAG, payload: tile }
}

export function stopDrag () {
  return { type: action.STOP_DRAG, payload: null }
}

export function updateScore (tileType, moves) {
  return { type: action.UPDATE_SCORE, payload: { moves, tileType } }
}

export function addPowerToWeather (weatherType, power) {
  return { type: action.WEATHER_POWER, payload: { weatherType, power } }
}

export function resetWeather (weatherType) {
  return { type: action.RESET_WEATHER, payload: weatherType }
}

export function checkTile (tile) {
  return { type: action.CHECK_TILE, payload: tile }
}

export function setView (view) {
  return { type: action.SET_VIEW, payload: view }
}
