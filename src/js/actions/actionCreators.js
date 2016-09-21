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
export const setView = createAction(types.SET_VIEW, identity)

export const updateScore = (tileType) => (dispatch, getState) => {
  const { moves: { moveArray }, score } = getState()
  const scores = {
    pod: score + moveArray.length * 5,
    seedling: score + moveArray.length
  }
  const scoreType = scores[tileType] || score
  dispatch({
    type: types.UPDATE_SCORE,
    payload: moveArray.length ? scoreType : score
  })
}

const sunAndRain = view(lensProp('weather'))
const weatherPower = createAction(types.WEATHER_POWER)

export const addPowerToWeather = (weatherType) => (dispatch, getState) => {
  const { sun, rain } = sunAndRain(getState())
  const newWeatherPower = {
    sun: weatherType === 'sun' ? sun + 1 : sun,
    rain: weatherType === 'rain' ? rain + 1 : rain
  }
  dispatch(weatherPower(newWeatherPower))
}

export const transformBoardAction = createAction(
  types.TRANSFORM_BOARD,
  (moves, board, number) => transformBoard(moves, board, number)
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
