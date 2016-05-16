import * as action from './actionTypes.js'

export function setDrag (bool) {
  return { type: action.SET_DRAG, payload: bool }
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

export function addTile (isDragging, tile, currTile, board) {
  return { type: action.ADD_TILE, payload: { isDragging, tile, currTile, board } }
}

export function setView (view) {
  return { type: action.SET_VIEW, payload: view }
}
