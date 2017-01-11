import { createSelector } from 'reselect'
import { movesOrder } from '../../../model/index.js'
import { _board, _moveArray, _growingMoves } from '../baseSelectors.js'

const _movesOrder = createSelector(
  [ _board, _moveArray ],
  (board, moveArray) => movesOrder(board, moveArray)
)

const _growingOrder = createSelector(
  [ _board, _growingMoves ],
  (board, growingMoves) => movesOrder(board, growingMoves)
)

module.exports = {
  movesOrder: _movesOrder,
  growingOrder: _growingOrder
}
