import { SHIFT_TILES, ADD_TILES, GROW_SEEDS } from '../actions/actionTypes.js'
import {
  randomBoard,
  shiftBoard,
  leavingBoard,
  addNewTiles,
  removeSeeds
} from '../model/model.js'
import { growSeeds } from '../model/growSeeds.js'

const defaultState = randomBoard()

export default (state = defaultState, action) => {
  switch (action.type) {
  case SHIFT_TILES:
    const { moves, board } = action.payload
    return moves.length > 0 ?
      shiftBoard(leavingBoard(moves, board)) :
      shiftBoard(removeSeeds(board))

  case ADD_TILES:
    return addNewTiles(action.payload)

  case GROW_SEEDS:
    return growSeeds(action.payload)

  default:
    return state
  }
}
