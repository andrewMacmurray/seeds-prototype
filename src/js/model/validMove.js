import { anyPass, allPass } from 'ramda'
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
