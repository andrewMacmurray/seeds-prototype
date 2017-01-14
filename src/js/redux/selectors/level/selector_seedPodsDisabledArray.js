import { createSelector } from 'reselect'
import { _board, _weatherTurns } from '../baseSelectors.js'
import { markTileOnBoard, falseBoard } from '../../../model'

const markSeedPods = markTileOnBoard(3)

module.exports = createSelector(
  [ _board, _weatherTurns ],
  (board, weatherTurns) => weatherTurns > 0
    ? falseBoard
    : markSeedPods(board)
)
