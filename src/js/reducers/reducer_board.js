import { SHIFT_TILES, ADD_TILES } from '../actions/actionTypes.js'
import {
  randomBoard,
  shiftBoard,
  leavingBoard,
  addNewTiles
} from '../model/model.js'

const defaultState = randomBoard()

export default (state = defaultState, action) => {
  switch (action.type) {
  case SHIFT_TILES:
    const { moves, board } = action.payload
    return shiftBoard(leavingBoard(moves, board))

  case ADD_TILES:
    return addNewTiles(action.payload)

  default:
    return state
  }
}
