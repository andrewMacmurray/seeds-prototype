import { addIndex, filter, reduce, map, concat, compose } from 'ramda'

const growSeedMove = (tile, i, j) => tile === 3 && Math.random() >= 0.5 ? [ i, j ] : 0
const mapWithIndex = addIndex(map)
const growMovesOnBoard = (board) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  growSeedMove(tile, i, j)
)(row))(board)

const collapseArr = reduce(concat, [])
const filterForTiles = filter(x => x !== 0)
export const growingMoveArray = compose(filterForTiles, collapseArr, growMovesOnBoard)
