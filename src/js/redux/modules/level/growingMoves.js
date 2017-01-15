import { createAction } from 'redux-actions'
import { growingMoveArray } from '../../../model'

// action types
const GROW_SEEDS = 'GROW_SEEDS'
const RESET_GROW_SEEDS = 'RESET_GROW_SEEDS'

// reducer
const defaultState = []
export default (state = defaultState, action) => {
  switch (action.type) {
  case GROW_SEEDS:
    return action.payload

  case RESET_GROW_SEEDS:
    return defaultState

  default:
    return state
  }
}

// actions
export const resetGrowSeeds = createAction(RESET_GROW_SEEDS)
export const setGrowingSeeds = createAction(GROW_SEEDS, moves => moves)

export const growRandomSeeds = (seedPodCount) => (dispatch, getState) => {
  const { tiles } = getState().level.board
  dispatch({
    type: GROW_SEEDS,
    payload: growingMoveArray(tiles, seedPodCount)
  })
}
