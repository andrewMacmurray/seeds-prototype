import * as action from './actionTypes.js'

export function setDrag (isDragging) {
  return { type: action.SET_DRAG, payload: isDragging }
}

export function isUpdating (bool) {
  return { type: action.IS_UPDATING, payload: bool }
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

export function growSeeds (board) {
  return { type: action.GROW_SEEDS, payload: board }
}

export function resetGrowSeeds () {
  return { type: action.RESET_GROW_SEEDS, payload: null }
}

export function transformBoard (transformMoves, board, transformNumber) {
  return { type: action.TRANSFORM_BOARD, payload: { transformMoves, board, transformNumber } }
}

export function removeSeeds (board) {
  return { type: action.REMOVE_SEEDS, payload: board }
}

export function resetWeather (weatherType) {
  return { type: action.RESET_WEATHER, payload: weatherType }
}

export function resetLeaving () {
  return { type: action.RESET_LEAVING, payload: null }
}

export function resetMagnitude () {
  return { type: action.RESET_MAGNITUDE, payload: null }
}

export function checkTile (tile, currTile, board) {
  return { type: action.CHECK_TILE, payload: { tile, currTile, board } }
}

export function fallTiles (moves, board) {
  return { type: action.FALL_TILES, payload: { moves, board } }
}

export function shiftTiles (moves, board) {
  return { type: action.SHIFT_TILES, payload: { moves, board } }
}

export function addTiles (board) {
  return { type: action.ADD_TILES, payload: board }
}

export function setView (view) {
  return { type: action.SET_VIEW, payload: view }
}
