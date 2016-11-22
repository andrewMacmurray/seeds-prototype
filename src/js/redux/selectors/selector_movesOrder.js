import { createSelector } from 'reselect'
import { movesOrder } from '../../model/index.js'
import { _board, _moveArray } from './baseSelectors.js'

module.exports = createSelector(
  [ _board, _moveArray ],
  (board, moveArray) => movesOrder(board, moveArray)
)
