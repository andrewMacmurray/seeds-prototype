import { GROW_SEEDS, RESET_GROW_SEEDS } from '../actions/actionTypes.js'
import { growingMoveArray } from '../model/growSeeds.js'

const defaultState = []
export default (state = defaultState, action) => {
  switch (action.type) {
  case GROW_SEEDS:
    return growingMoveArray(action.payload)
  case RESET_GROW_SEEDS:
    return defaultState
  default:
    return state
  }
}
