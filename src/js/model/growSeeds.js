import R from 'ramda'

const _growSeed = (tile, i, j) => tile === 3 && Math.random() >= 0.5 ? [ i, j ] : 0
const mapWithIndex = R.addIndex(R.map)
const growMovesOnBoard = (board) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  _growSeed(tile, i, j)
)(row))(board)

const collapseArr = R.reduce((a, b) => R.concat(a, b), [])
const filterForTiles = R.filter(x => x !== 0)
export const growingMoveArray = R.compose(filterForTiles, collapseArr, growMovesOnBoard)

// randomly select seeds : 3s
// map those threes to moves on the board
// produce a boolean array
