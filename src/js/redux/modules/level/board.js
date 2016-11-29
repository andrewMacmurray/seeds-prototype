import { createAction } from 'redux-actions'
import defaultProbabilities from '../../../constants/defaultProbabilities.js'
import {
  randomBoard,
  transformTiles,
  shiftBoard,
  addNewTiles
} from '../../../model'

// action types
const SHIFT_TILES = 'SHIFT_TILES'
const ADD_TILES = 'ADD_TILES'
const GROW_SEEDS_ON_BOARD = 'GROW_SEEDS_ON_BOARD'
const REMOVE_SEEDS_FROM_BOARD = 'REMOVE_SEEDS_FROM_BOARD'
const SET_BOARD_SIZE = 'SET_BOARD_SIZE'
const SET_PROBABILITIES = 'SET_PROBABILITIES'

// reducer
const initialLoadProbability = {
  rain: 0.25,
  sun: 0.25,
  seedling: 0.4,
  pod: 0.1
}

const defaultState = {
  tiles: randomBoard(8, initialLoadProbability),
  probabilities: defaultProbabilities,
  boardSize: 8
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SHIFT_TILES:
    return {
      ...state,
      tiles: action.payload
    }

  case ADD_TILES:
    return {
      ...state,
      tiles: action.payload
    }

  case GROW_SEEDS_ON_BOARD:
    return {
      ...state,
      tiles: action.payload
    }

  case REMOVE_SEEDS_FROM_BOARD:
    return {
      ...state,
      tiles: action.payload
    }

  case SET_BOARD_SIZE:
    return {
      ...state,
      boardSize: action.payload,
      tiles: randomBoard(action.payload, state.probabilities)
    }

  case SET_PROBABILITIES:
    return {
      ...state,
      probabilities: action.payload
    }

  default:
    return state
  }
}

// actions
export const shiftTiles = (moves) => (dispatch, getState) => {
  const { tiles } = getState().level.board
  dispatch({
    type: SHIFT_TILES,
    payload: shiftBoard(transformTiles(moves, tiles, 0))
  })
}

export const addTiles = () => (dispatch, getState) => {
  const { tiles, probabilities } = getState().level.board
  dispatch({
    type: ADD_TILES,
    payload: addNewTiles(tiles, probabilities)
  })
}

export const growSeedsFromMoves = (moves) => (dispatch, getState) => {
  const { tiles } = getState().level.board
  dispatch({
    type: GROW_SEEDS_ON_BOARD,
    payload: transformTiles(moves, tiles, 4)
  })
}

export const growSeedsOnBoard = () => (dispatch, getState) => {
  const { level } = getState()
  const { board: { tiles }, growingMoves } = level

  dispatch({
    type: GROW_SEEDS_ON_BOARD,
    payload: transformTiles(growingMoves, tiles, 4)
  })
}

export const removeSeedsFromBoard = (moves) => (dispatch, getState) => {
  const { tiles } = getState().level.board
  dispatch({
    type: REMOVE_SEEDS_FROM_BOARD,
    payload: transformTiles(moves, tiles, 0)
  })
}

export const setBoardSize = createAction(SET_BOARD_SIZE, x => x)
export const setProbabilities = createAction(SET_PROBABILITIES, x => x)
