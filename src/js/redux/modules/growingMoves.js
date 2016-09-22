import { createAction } from 'redux-actions'
import { growingMoveArray } from '../../model'

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

export const growSeeds = () => (dispatch, getState) => {
  const { board } = getState()
  dispatch({
    type: GROW_SEEDS,
    payload: growingMoveArray(board)
  })
}
