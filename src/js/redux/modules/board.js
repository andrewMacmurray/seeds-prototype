import {
  randomBoard,
  transformTiles,
  removeSeedsFromBoard,
  shiftBoard,
  addNewTiles
} from '../../model'
import { createAction } from 'redux-actions'

// action types
const SHIFT_TILES = 'SHIFT_TILES'
const ADD_TILES = 'ADD_TILES'
const TRANSFORM_BOARD = 'TRANSFORM_BOARD'

// reducer
const defaultState = randomBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
  case SHIFT_TILES:
    return action.payload

  case ADD_TILES:
    return action.payload

  case TRANSFORM_BOARD:
    return action.payload

  default:
    return state
  }
}

// actions
export const shiftTiles = () => (dispatch, getState) => {
  const { board, moves: { moveArray } } = getState()

  const newboard = moveArray.length > 0
    ? shiftBoard(transformTiles(moveArray, board, 0))
    : shiftBoard(removeSeedsFromBoard(board))
  dispatch({
    type: SHIFT_TILES,
    payload: newboard
  })
}

export const addTiles = () => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: ADD_TILES,
    payload: addNewTiles(board)
  })
}

export const transformBoard = createAction(
  TRANSFORM_BOARD,
  (moves, board, number) => transformTiles(moves, board, number)
)
