import * as types from './actionTypes.js'

export function stepIntroText () {
  return { type: types.STEP_INTRO_TEXT }
}

export function resetIntroStep () {
  return { type: types.RESET_INTRO_STEP }
}

export function setDrag (isDragging) {
  return { type: types.SET_DRAG, payload: isDragging }
}

export function isUpdating (bool) {
  return { type: types.IS_UPDATING, payload: bool }
}

export function stopDrag (board, moves) {
  return { type: types.STOP_DRAG, payload: { board, moves } }
}

export function updateScore (tileType, moves) {
  return { type: types.UPDATE_SCORE, payload: { moves, tileType } }
}

export function setEntering (board) {
  return { type: types.SET_ENTERING, payload: board }
}

export function resetEntering () {
  return { type: types.RESET_ENTERING }
}

export function addPowerToWeather (weatherType, power) {
  return { type: types.WEATHER_POWER, payload: { weatherType, power } }
}

export function growSeeds (board) {
  return { type: types.GROW_SEEDS, payload: board }
}

export function resetGrowSeeds () {
  return { type: types.RESET_GROW_SEEDS }
}

export function transformBoard (transformMoves, board, transformNumber) {
  return { type: types.TRANSFORM_BOARD, payload: { transformMoves, board, transformNumber } }
}

export function removeSeeds (board) {
  return { type: types.REMOVE_SEEDS, payload: board }
}

export function resetWeather (weatherType) {
  return { type: types.RESET_WEATHER, payload: weatherType }
}

export function resetLeaving () {
  return { type: types.RESET_LEAVING }
}

export function resetMagnitude () {
  return { type: types.RESET_MAGNITUDE }
}

export function checkTile (tile, currTile, board) {
  return { type: types.CHECK_TILE, payload: { tile, currTile, board } }
}

export function fallTiles (moves, board) {
  return { type: types.FALL_TILES, payload: { moves, board } }
}

export function shiftTiles (moves, board) {
  return { type: types.SHIFT_TILES, payload: { moves, board } }
}

export function addTiles (board) {
  return { type: types.ADD_TILES, payload: board }
}

export function setView (view) {
  return { type: types.SET_VIEW, payload: view }
}
