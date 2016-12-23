import { createSelector } from 'reselect'
import { isGrowingArray } from '../../../model'
import { _board, _growingMoves } from '../baseSelectors.js'

const _isGrowingArray = createSelector(
  [ _board, _growingMoves ],
  (board, growingMoves) => {
    return isGrowingArray(board, growingMoves)
  }
)

export default _isGrowingArray
