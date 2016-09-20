import { compose, times, anyPass, allPass, equals, filter, concat, map, addIndex } from 'ramda'
import {
  left,
  right,
  up,
  down,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
} from './directions.js'

const multiply = (x) => x * 3 + 1
const roundRandom = compose(Math.round, multiply, Math.random)
const makeRow = () => times(roundRandom, 8)
export const randomBoard = () => times(makeRow, 8)

// before and after tile values have to match
export const sameType = ([ x2, y2 ], [ x1, y1 ], board) => board[x2][y2] === board[x1][y1]

// after coordinate has to be within the bounds of the board
const inBounds = ([ x2, y2 ]) => x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8

// move is valid if the x and y coordiantes are either plus 1 or minus one of the previous
export const isNextTo = anyPass([
  right,
  down,
  left,
  up,
  topRight,
  bottomRight,
  bottomLeft,
  topLeft
])
// export const isNextTo = R.anyPass([right, down, left, up]) // restrict to 4 directions

export const validMove = allPass([ inBounds, isNextTo, sameType ])

const isZero = equals(0)
const isTile = (tile) => tile !== 0
const filterZeroes = filter(isZero)
const filterTiles = filter(isTile)

export const shift = (board) => concat(filterZeroes(board), filterTiles(board))

// shift zero tiles to the top of the array
export const shiftBoard = map(shift)

const addRandomTile = (x) => isZero(x) ? roundRandom() : x
const addNewRow = map(addRandomTile)

// replaces zero (leaving) tiles with new random tiles
export const addNewTiles = map(addNewRow)

const mapWithIndex = addIndex(map)

// converts the tiles on the board to a new number
// where the board coordiantes match the coordiantes in an array of moves
export const transformBoard = (moves, board, transformNumber) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  filter(([ y, x ]) =>
    y === i && j === x)(moves).length ? transformNumber : tile
)(row))(board)

// converts zero tiles to an array of booleans (true if leaving, false if staying)
export const booleanArray = map(map(x => x === 0))

const removeSeed = (x) => x === 3 || x === 4 ? 0 : x
export const seedsRow = map(removeSeed)
export const removeSeedsFromBoard = map(seedsRow)
