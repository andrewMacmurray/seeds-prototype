import { createAction } from 'redux-actions'
import { moreSeedlings, even } from '../../../constants/probabilities.js'
import {
  randomBoard,
  transformTiles,
  shiftBoard,
  addNewTiles
} from '../../../model'

// action types
const SHIFT_TILES = 'SHIFT_TILES'
const ADD_TILES = 'ADD_TILES'
const SHUFFLE_TILES = 'SHUFFLE_TILES'
const GROW_SEEDS_ON_BOARD = 'GROW_SEEDS_ON_BOARD'
const REMOVE_SEEDS_FROM_BOARD = 'REMOVE_SEEDS_FROM_BOARD'
const SET_BOARD_SIZE = 'SET_BOARD_SIZE'
const SET_PROBABILITIES = 'SET_PROBABILITIES'

// reducer
const initialLoadProbability = even
const initialBoardSize = 8
const defaultState = {
  tiles: randomBoard(initialBoardSize, initialLoadProbability),
  probabilities: moreSeedlings,
  boardSize: initialBoardSize
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

  case SHUFFLE_TILES:
    return {
      ...state,
      tiles: randomBoard(state.boardSize, action.payload || state.probabilities)
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

export const shuffleTiles = createAction(SHUFFLE_TILES, x => x)
export const setBoardSize = createAction(SET_BOARD_SIZE, x => x)
export const setProbabilities = createAction(SET_PROBABILITIES, x => x)
