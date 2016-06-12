import { STOP_DRAG, RESET_LEAVING } from '../actions/actionTypes.js'
import { falseBoard, mapLeavingTiles } from '../model/model.js'

const defaultState = falseBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
  case STOP_DRAG:
    const { moves, board } = action.payload
    return mapLeavingTiles(moves, board)

  case RESET_LEAVING:
    return defaultState

  default:
    return state
  }
}
