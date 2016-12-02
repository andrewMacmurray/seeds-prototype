import { createAction } from 'redux-actions'
import { transformTiles, booleanArray, removeSeedsFromBoard, falseBoard } from '../../../model'

// action types
const SET_LEAVING_TILES = 'SET_LEAVING_TILES'
const RESET_LEAVING = 'RESET_LEAVING'
const REMOVE_SEEDS = 'REMOVE_SEEDS'

// reducer
const defaultState = falseBoard
export default (state = defaultState, action) => {
  switch (action.type) {
  case RESET_LEAVING:
    return defaultState

  case SET_LEAVING_TILES:
    return action.payload

  case REMOVE_SEEDS:
    return action.payload

  default:
    return state
  }
}

// actions
export const resetLeaving = createAction(RESET_LEAVING)

export const setLeavingTiles = (moves) => (dispatch, getState) => {
  const { tiles } = getState().level.board
  dispatch({
    type: SET_LEAVING_TILES,
    payload: booleanArray(transformTiles(moves, tiles, 0))
  })
}

export const removeSeeds = createAction(
  REMOVE_SEEDS,
  board => booleanArray(removeSeedsFromBoard(board))
)
