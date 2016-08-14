import { addIndex, filter, map, unnest, compose } from 'ramda'

const growSeedMove = (_, tile, i, j) => tile === 3 && Math.random() >= 0.5 ? [ i, j ] : 0
const mapWithIndex = addIndex(map)

const mapBoard = (fn) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  fn(row, tile, i, j)
)(row))

const growMovesOnBoard = mapBoard(growSeedMove)

const filterForTiles = filter(x => x !== 0)
export const growingMoveArray = compose(filterForTiles, unnest, growMovesOnBoard)

export const isGrowingArray = (moves, board) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  filter(([ y, x ]) => x === j && y === i)(moves).length > 0)(row))(board)
