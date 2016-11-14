import { addIndex, filter, length, map, unnest, compose } from 'ramda'

const probabilityMap = (n) =>
      n > 20 ? 0.5
    : n < 20 && n >= 10 ? 0.7
    : n < 10 && n >= 5 ? 0.9
    : n < 5 ? 1
    : 0.5

const growSeedMove = (tile, i, j, count) => {
  return tile === 3 && Math.random() < probabilityMap(count)
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

const filterForTiles = filter(x => x !== 0)
export const growingMoveArray = compose(
  filterForTiles,
  unnest,
  growMovesOnBoard
)

const isTileGrowing = (_, i, j, moves) => filter(([ y, x ]) => x === j && y === i)(moves).length > 0
export const isGrowingArray = (board, moves) => mapBoard(isTileGrowing, moves)(board)

const isSeed = (tile, i, j) => tile === 4 ? [ i, j ] : 0
const seedMovesOnBoard = mapBoard(isSeed)

export const getSeedMoves = compose(
  filterForTiles,
  unnest,
  seedMovesOnBoard
)

export const countSeedlings = compose(
  length,
  filter(x => x === 3),
  unnest
)
