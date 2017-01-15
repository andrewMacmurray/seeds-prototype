import { filter, length, equals, complement, unnest, compose } from 'ramda'
import { mapBoard } from './utils.js'

const growProbability = (n) => n > 10 ? 0.6 : 1

const growSeedMove = (tile, i, j, count) => {
  return tile === 3 && Math.random() < growProbability(count)
    ? [ i, j ]
    : 0
}

const growMovesOnBoard = (board, seedPodCount) => mapBoard(growSeedMove, seedPodCount)(board)

const notZero = complement(equals(0))
const filterForTiles = filter(notZero)
export const growingMoveArray = compose(
  filterForTiles,
  unnest,
  growMovesOnBoard
)

const isTileGrowing = (_, i, j, moves) => filter(([ y, x ]) => x === j && y === i)(moves).length > 0
export const isGrowingArray = (board, moves) => mapBoard(isTileGrowing, moves)(board)

const isSeed = equals(4)
const seedTiles = (tile, i, j) => isSeed(tile) ? [ i, j ] : 0
const seedMovesOnBoard = mapBoard(seedTiles)

export const getSeedMoves = compose(
  filterForTiles,
  unnest,
  seedMovesOnBoard
)

const isSeedPod = equals(3)
export const countSeedPods = compose(
  length,
  filter(isSeedPod),
  unnest
)
