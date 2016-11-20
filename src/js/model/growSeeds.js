import { addIndex, filter, length, map, equals, complement, unnest, compose } from 'ramda'

const growProbability = (n) => n > 20 ? 0.9 : 1

const growSeedMove = (tile, i, j, count) => {
  return tile === 3 && Math.random() < growProbability(count)
    ? [ i, j ]
    : 0
}

const mapWithIndex = addIndex(map)

const mapBoard = (transformFn, extraData) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  transformFn(tile, i, j, extraData)
)(row))

const growMovesOnBoard = (board, seedlingCount) => mapBoard(growSeedMove, seedlingCount)(board)

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

const isSeedling = equals(3)
export const countSeedlings = compose(
  length,
  filter(isSeedling),
  unnest
)
