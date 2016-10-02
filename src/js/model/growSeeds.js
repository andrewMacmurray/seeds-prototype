import { addIndex, filter, map, unnest, compose } from 'ramda'

const growSeedMove = (tile, i, j) => tile === 3 && Math.random() >= 0.5 ? [ i, j ] : 0
const mapWithIndex = addIndex(map)

const mapBoard = (transformFn, extraData) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  transformFn(tile, i, j, extraData)
)(row))

const growMovesOnBoard = mapBoard(growSeedMove)

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
