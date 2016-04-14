import R from 'ramda'

const multiply = (x) => x * 3
const roundRandom = R.pipe(
  Math.random,
  multiply,
  Math.round
)
const makeRow = () => R.times(roundRandom, 8)
// const str = (x) => JSON.stringify(x)

export const randomBoard = () => R.times(makeRow, 8)

const board = [
  [2, 3, 3, 1, 2, 0, 0, 1],
  [2, 0, 2, 3, 2, 0, 1, 1],
  [2, 1, 0, 1, 1, 2, 1, 2],
  [1, 1, 2, 3, 1, 1, 0, 2],
  [1, 1, 0, 1, 1, 1, 2, 1],
  [2, 3, 1, 2, 2, 1, 2, 3],
  [1, 1, 1, 1, 2, 2, 0, 2],
  [1, 3, 2, 2, 1, 3, 2, 2]
]

export const mapIndex = R.addIndex(R.map)

export const getIndex = R.map(mapIndex((val, i) => i))
// console.log(getIndex)

// before and after tile values have to match
const sameType = ([x2, y2], [x1, y1], board) => board[x2][y2] === board[x1][y1]

// after coordinate has to be within the bounds of the board
const inBounds = ([x2, y2]) => x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8

// move is valid if the x and y coordiantes are either plus 1 or minus one of the previous
const isNextTo = ([x2, y2], [x1, y1]) => x2 + 1 === x1 || x2 - 1 === x1 || y2 + 1 === y1 || y2 - 1 === y1

export const validMove = R.allPass([inBounds, isNextTo, sameType])
const valid1 = validMove([6, 7], [7, 7], board)
console.log(valid1)
