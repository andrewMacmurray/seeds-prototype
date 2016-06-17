import { FALL_TILES, RESET_MAGNITUDE } from '../actions/actionTypes.js'
import { falseBoard, mapFallingTiles, leavingBoard, removeSeeds } from '../model/model.js'

const defaultState = falseBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
  case FALL_TILES:
    const { board, moves } = action.payload
    // console.log(board, moves)
    return moves.length > 0 ?
      mapFallingTiles(leavingBoard(moves, board)) :
      mapFallingTiles(removeSeeds(board))

  case RESET_MAGNITUDE:
    return defaultState

  default:
    return state
  }
}
