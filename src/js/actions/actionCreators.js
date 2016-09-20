import * as types from './actionTypes.js'
import {
  booleanArray,
  transformBoard,
  removeSeedsFromBoard,
  addNewTiles,
  shiftBoard,
  validMove
} from '../model/model.js'
import { mapFallingTiles } from '../model/mapFallingTiles.js'
import { growingMoveArray } from '../model/growSeeds.js'
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

export const stopDrag = createAction(
  types.STOP_DRAG,
  (board, moves) => booleanArray(transformBoard(moves, board, 0))
)

export const updateScore = (tileType, moves, score) => {
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

export const setEntering = createAction(
  types.SET_ENTERING,
  board => booleanArray(board)
)

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

export const growSeeds = createAction(
  types.GROW_SEEDS,
  board => growingMoveArray(board)
)

export const transformBoardAction = createAction(
  types.TRANSFORM_BOARD,
  (moves, board, number) => transformBoard(moves, board, number)
)

export const removeSeeds = createAction(
  types.REMOVE_SEEDS,
  board => booleanArray(removeSeedsFromBoard(board))
)

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

export const checkTile = (tile) => (dispatch, getState) => {
  const { board, moves: { currTile, moveArray } } = getState()
  const isValid = validMove(tile, currTile, board)
  let nextMoves = {
    moveArray,
    currTile
  }

  if (moveArray.length === 0) {
    nextMoves = {
      moveArray: moveArray.concat([ tile ]),
      currTile: tile
    }
  }

  if (isValid) {
    nextMoves = {
      moveArray: moveArray.concat([ tile ]),
      currTile: tile
    }
  }
  dispatch({
    type: types.CHECK_TILE,
    payload: nextMoves
  })
}

export const fallTiles = (moves, board) => {
  const newboard = moves.length > 0
    ? mapFallingTiles(transformBoard(moves, board, 0))
    : mapFallingTiles(removeSeedsFromBoard(board))
  return {
    type: types.FALL_TILES,
    payload: newboard
  }
}

export const shiftTiles = (moves, board) => {
  const newboard = moves.length > 0
    ? shiftBoard(transformBoard(moves, board, 0))
    : shiftBoard(removeSeedsFromBoard(board))
  return {
    type: types.SHIFT_TILES,
    payload: newboard
  }
}

export const addTiles = createAction(
  types.ADD_TILES,
  (board) => addNewTiles(board)
)
