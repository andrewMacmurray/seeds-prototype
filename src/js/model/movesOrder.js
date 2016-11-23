const { equals } = require('ramda')
const { mapBoard, reduceWithIndex } = require('./utils.js')

const getMoveIndex = (tile, i, j, moves) => moves.length
  ? reduceWithIndex(
    (prev, curr, k) => prev > 0
      ? prev : equals(curr, [ i, j ])
      ? (k + 1) % 12 : 0
  , 0)(moves)
  : 0

export const movesOrder = (board, moves) => mapBoard(getMoveIndex, moves)(board)
