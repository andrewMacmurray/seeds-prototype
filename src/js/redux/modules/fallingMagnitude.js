import { createAction } from 'redux-actions'
import {
  transformTiles,
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

export const fallTiles = (moves) => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: FALL_TILES,
    payload: mapFallingTiles(transformTiles(moves, board, 0))
  })
}
