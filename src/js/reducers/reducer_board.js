import { SHIFT_TILES, ADD_TILES, TRANSFORM_BOARD } from '../actions/actionTypes.js'
import {
  randomBoard,
  shiftBoard,
  transformBoard,
  addNewTiles,
  removeSeeds
} from '../model/model.js'
// import { growSeeds } from '../model/growSeeds.js'

const defaultState = randomBoard()

export default (state = defaultState, action) => {
  let moves, board, transformNumber, transformMoves

  switch (action.type) {
  case SHIFT_TILES:
    ({ moves, board } = action.payload)
    return moves.length > 0 ?
      shiftBoard(transformBoard(moves, board, 0)) :
      shiftBoard(removeSeeds(board))

  case ADD_TILES:
    return addNewTiles(action.payload)

  case TRANSFORM_BOARD:
    ({ transformMoves, board, transformNumber } = action.payload)
    return transformBoard(transformMoves, board, transformNumber)

  default:
    return state
  }
}
