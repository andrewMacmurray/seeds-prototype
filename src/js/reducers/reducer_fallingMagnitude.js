import { STOP_DRAG, RESET_MAGNITUDE } from '../actions/actionTypes.js'
import { falseBoard, mapFallingTiles, leavingBoard } from '../model/model.js'

const defaultState = falseBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
  case STOP_DRAG:
    const { board, moves } = action.payload
    return mapFallingTiles(leavingBoard(moves, board))

  case RESET_MAGNITUDE:
    return defaultState

  default:
    return state
  }
}
