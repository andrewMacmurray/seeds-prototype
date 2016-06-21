import { createSelector } from 'reselect'
import { transformBoard, booleanSeeds } from '../model/model.js'

const transformMoves = (state) => state.transformMoves
const board = (state) => state.board
const isGrowingArray = createSelector(
  [ transformMoves, board ],
  (transform) => {
    const [ x, y ] = transform[0]
    if (board[x][y] === '3') {
      
    }
  }
)

export default isGrowingArray
