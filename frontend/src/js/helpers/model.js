import R from 'ramda'

const multiply = (x) => x * 3 + 1
const roundRandom = R.pipe(
  Math.random,
  multiply,
  Math.round
)
const makeRow = () => R.times(roundRandom, 8)
// const str = (x) => JSON.stringify(x)

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
const right = ([x2, y2], [x1, y1]) => x2 + 1 === x1 && y2 === y1
const down = ([x2, y2], [x1, y1]) => x2 === x1 && y2 + 1 === y1
const left = ([x2, y2], [x1, y1]) => x2 - 1 === x1 && y2 === y1
const up = ([x2, y2], [x1, y1]) => x2 === x1 && y2 - 1 === y1
const topRight = ([x2, y2], [x1, y1]) => x2 + 1 === x1 && y2 - 1 === y1
const bottomRight = ([x2, y2], [x1, y1]) => x2 + 1 === x1 && y2 + 1 === y1
const bottomLeft = ([x2, y2], [x1, y1]) => x2 - 1 === x1 && y2 + 1 === y1
const topLeft = ([x2, y2], [x1, y1]) => x2 - 1 === x1 && y2 - 1 === y1

export const isNextTo = R.anyPass([right, down, left, up, topRight, bottomRight, bottomLeft, topLeft])

export const validMove = R.allPass([inBounds, isNextTo, sameType])
// const valid1 = validMove([0, 0], [0, 1], board)
// console.log(valid1)
