import * as types from './actionTypes.js'
import { booleanArray, transformBoard } from '../model/model.js'
import { falseBoard, trueBoard } from '../model/constants.js'
import { createAction } from 'redux-actions'
import { identity, lensProp, view } from 'ramda'

export const stepIntroText = createAction(types.STEP_INTRO_TEXT)
export const resetIntroStep = createAction(types.RESET_INTRO_STEP)
export const setDrag = createAction(types.SET_DRAG, identity)
export const isUpdating = createAction(types.IS_UPDATING, identity)
export const resetEntering = createAction(types.RESET_ENTERING)
export const resetGrowSeeds = createAction(types.RESET_GROW_SEEDS)
export const resetLeaving = createAction(types.RESET_LEAVING)
export const resetMagnitude = createAction(types.RESET_MAGNITUDE)
export const setView = createAction(types.SET_VIEW, identity)

export const stopDrag = (board, moves) => {
  const boardWithRemovedTiles = booleanArray(transformBoard(moves, board, 0))
  return {
    type: types.STOP_DRAG,
    payload: boardWithRemovedTiles
  }
}

export function updateScore (tileType, moves, score) {
  const scores = {
    pod: score + moves.length * 5,
    seedling: score + moves.length
  }
  const scoreType = scores[tileType] || score
  return {
    type: types.UPDATE_SCORE,
    payload: moves.length ? scoreType : score
  }
}

export const setEntering = (board) => {
  return {
    type: types.SET_ENTERING,
    payload: booleanArray(board)
  }
}

const sunAndRain = view(lensProp('weather'))
export const addPowerToWeather = (weatherType, power) => (dispatch, getState) => {
  const { sun, rain } = sunAndRain(getState())
  const newWeatherPower = {
    sun: weatherType === 'sun' ? sun + 1 : sun,
    rain: weatherType === 'rain' ? rain + 1 : rain
  }
  dispatch({
    type: types.WEATHER_POWER,
    payload: newWeatherPower
  })
}

export function growSeeds (board) {
  return { type: types.GROW_SEEDS, payload: board }
}

export function transformBoardAction (transformMoves, board, transformNumber) {
  return { type: types.TRANSFORM_BOARD, payload: { transformMoves, board, transformNumber } }
}

export function removeSeeds (board) {
  return { type: types.REMOVE_SEEDS, payload: board }
}

export const resetWeather = (weatherType) => (dispatch, getState) => {
  const { sun, rain } = sunAndRain(getState())
  const newWeatherPower = {
    sun: weatherType === 'sun' ? 0 : sun,
    rain: weatherType === 'rain' ? 0 : rain
  }
  dispatch({
    type: types.RESET_WEATHER,
    payload: newWeatherPower
  })
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
