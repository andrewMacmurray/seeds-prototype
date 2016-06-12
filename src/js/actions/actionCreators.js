import * as action from './actionTypes.js'

export function setDrag (isDragging) {
  return { type: action.SET_DRAG, payload: isDragging }
}

export function startDrag (tile) {
  return { type: action.START_DRAG, payload: tile }
}

export function stopDrag (board, moves) {
  return { type: action.STOP_DRAG, payload: { board, moves } }
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

export function checkTile (tile, currTile, isDragging, board, moves) {
  return { type: action.CHECK_TILE, payload: { tile, currTile, isDragging, board, moves } }
}

export function shiftTiles (board) {
  return { type: action.SHIFT_TILES, payload: board }
}

export function addTiles (board) {
  return { type: action.ADD_TILES, payload: board }
}

export function setView (view) {
  return { type: action.SET_VIEW, payload: view }
}
