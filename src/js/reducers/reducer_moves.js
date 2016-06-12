import { CHECK_TILE } from '../actions/actionTypes.js'
import {
  validMove,
  falseBoard,
  booleanArray,
  leavingBoard
} from '../model/model.js'
const defaultState = { moveArray: [], currTile: [], isDraggingArray: falseBoard() }

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_TILE:
      const { tile, currTile, isDragging, board } = action.payload
      const isValid = isDragging && validMove(tile, currTile, board)

      if (state.moveArray.length === 0) {
        return {
          ...state,
          moveArray: state.moveArray.concat([tile]),
          currTile: tile,
          isDraggingArray: booleanArray(leavingBoard([tile], board))
        }
      }

      if (isValid) {
        const moves = state.moveArray.concat([tile])
        return {
          ...state,
          moveArray: moves,
          currTile: tile,
          isDraggingArray: booleanArray(leavingBoard(moves, board))
        }
      }

      return state

    default:
      return state
  }
}
