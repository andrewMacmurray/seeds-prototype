import { createSelector } from 'reselect'
import { isGrowingArray } from '../model/growSeeds.js'

const _board = (state) => state.board
const _growingMoves = (state) => state.growingMoves

const _isGrowingArray = createSelector(
  [ _growingMoves, _board ],
  (growingMoves, board) => {
    console.log(growingMoves)
    return isGrowingArray(growingMoves, board)
  }
)

export default _isGrowingArray
