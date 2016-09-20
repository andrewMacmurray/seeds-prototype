import { CHECK_TILE, STOP_DRAG } from '../actions/actionTypes.js'
import { validMove } from '../model/model.js'
const defaultState = { moveArray: [], currTile: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
  case CHECK_TILE:
    return action.payload

  case STOP_DRAG:
    return defaultState

  default:
    return state
  }
}
