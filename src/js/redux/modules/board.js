import {
  randomBoard,
  transformTiles,
  shiftBoard,
  addNewTiles
} from '../../model'

// action types
const SHIFT_TILES = 'SHIFT_TILES'
const ADD_TILES = 'ADD_TILES'
const GROW_SEEDS_ON_BOARD = 'GROW_SEEDS_ON_BOARD'
const REMOVE_SEEDS_FROM_BOARD = 'REMOVE_SEEDS_FROM_BOARD'

// reducer
const initialLoadProbability = {
  rain: 0.25,
  sun: 0.25,
  seedling: 0.4,
  pod: 0.1
}

const defaultState = randomBoard(initialLoadProbability)
export default (state = defaultState, action) => {
  switch (action.type) {
  case SHIFT_TILES:
    return action.payload

  case ADD_TILES:
    return action.payload

  case GROW_SEEDS_ON_BOARD:
    return action.payload

  case REMOVE_SEEDS_FROM_BOARD:
    return action.payload

  default:
    return state
  }
}

// actions
export const shiftTiles = (moves) => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: SHIFT_TILES,
    payload: shiftBoard(transformTiles(moves, board, 0))
  })
}

export const addTiles = () => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: ADD_TILES,
    payload: addNewTiles(board)
  })
}

export const growSeedsFromMoves = (moves) => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: GROW_SEEDS_ON_BOARD,
    payload: transformTiles(moves, board, 4)
  })
}

export const growSeedsOnBoard = () => (dispatch, getState) => {
  const { board, growingMoves } = getState()
  dispatch({
    type: GROW_SEEDS_ON_BOARD,
    payload: transformTiles(growingMoves, board, 4)
  })
}

export const removeSeedsFromBoard = (moves) => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: REMOVE_SEEDS_FROM_BOARD,
    payload: transformTiles(moves, board, 0)
  })
}
