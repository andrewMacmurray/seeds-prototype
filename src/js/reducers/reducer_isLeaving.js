import { STOP_DRAG, RESET_LEAVING, REMOVE_SEEDS } from '../actions/actionTypes.js'
import { falseBoard, transformBoard, booleanArray, removeSeeds } from '../model/model.js'

const defaultState = falseBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
  case STOP_DRAG:
    const { moves, board } = action.payload
    return booleanArray(transformBoard(moves, board, 0))

  case RESET_LEAVING:
    return defaultState

  case REMOVE_SEEDS:
    return booleanArray(removeSeeds(action.payload))

  default:
    return state
  }
}
