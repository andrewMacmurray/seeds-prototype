import { STOP_DRAG, RESET_LEAVING, REMOVE_SEEDS } from '../actions/actionTypes.js'
import { transformBoard, booleanArray, removeSeeds } from '../model/model.js'
import { falseBoard } from '../model/constants.js'

const defaultState = falseBoard
export default (state = defaultState, action) => {
  switch (action.type) {
  case STOP_DRAG:
    return action.payload

  case RESET_LEAVING:
    return defaultState

  case REMOVE_SEEDS:
    return action.payload

  default:
    return state
  }
}
