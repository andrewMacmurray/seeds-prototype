import { createSelector } from 'reselect'
import { isGrowingArray } from '../../model'

const _board = (state) => state.board
const _growingMoves = (state) => state.growingMoves

const _isGrowingArray = createSelector(
  [ _board, _growingMoves ],
  (board, growingMoves) => {
    return isGrowingArray(board, growingMoves)
  }
)

export default _isGrowingArray
