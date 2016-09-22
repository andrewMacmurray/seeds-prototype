import { createAction } from 'redux-actions'
import {
  transformTiles,
  removeSeedsFromBoard,
  falseBoard,
  mapFallingTiles
} from '../../model'

// action types
const FALL_TILES = 'FALL_TILES'
const RESET_MAGNITUDE = 'RESET_MAGNITUDE'

// reducer
const defaultState = falseBoard
export default (state = defaultState, action) => {
  switch (action.type) {
  case FALL_TILES:
    return action.payload

  case RESET_MAGNITUDE:
    return defaultState

  default:
    return state
  }
}

// actions
export const resetMagnitude = createAction(RESET_MAGNITUDE)

export const fallTiles = (moves, board) => {
  const newboard = moves.length > 0
    ? mapFallingTiles(transformTiles(moves, board, 0))
    : mapFallingTiles(removeSeedsFromBoard(board))
  return {
    type: FALL_TILES,
    payload: newboard
  }
}
