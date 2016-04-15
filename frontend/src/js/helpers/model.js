import R from 'ramda'
import { left, right, up, down, topRight, topLeft, bottomRight, bottomLeft } from './directions.js'

const multiply = (x) => x * 3 + 1
export const roundRandom = R.pipe(
  Math.random,
  multiply,
  Math.round
)
const makeRow = () => R.times(roundRandom, 8)

export const randomBoard = () => R.times(makeRow, 8)

const board = [
  [4, 1, 2, 2, 2, 3, 1, 2],
  [4, 3, 3, 1, 2, 3, 4, 3],
  [4, 4, 3, 2, 4, 1, 1, 4],
  [2, 2, 4, 1, 3, 3, 2, 2],
  [4, 1, 2, 1, 2, 2, 4, 1],
  [3, 3, 4, 3, 2, 2, 1, 3],
  [2, 2, 4, 2, 2, 1, 2, 2],
  [3, 3, 2, 3, 1, 1, 2, 3]
]

export const mapIndex = R.addIndex(R.map)

export const getIndex = R.map(mapIndex((val, i) => i))

// before and after tile values have to match
export const sameType = ([x2, y2], [x1, y1], board) => board[x2][y2] === board[x1][y1]

// after coordinate has to be within the bounds of the board
const inBounds = ([x2, y2]) => x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8

// move is valid if the x and y coordiantes are either plus 1 or minus one of the previous
export const isNextTo = R.anyPass([right, down, left, up, topRight, bottomRight, bottomLeft, topLeft])

export const validMove = R.allPass([inBounds, isNextTo, sameType])
// const valid1 = validMove([0, 0], [0, 1], board)
// console.log(valid1)

const zero = (x) => x === 0
const tile = (x) => x !== 0

const filterZeroes = R.map(zero)
const filterTiles = R.map(tile)
