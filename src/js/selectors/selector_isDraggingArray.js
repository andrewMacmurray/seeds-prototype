import { createSelector } from 'reselect'

import { CHECK_TILE } from '../actions/actionTypes.js'
import { falseBoard, booleanArray, leavingBoard } from '../model/model.js'

const moveArray = (state) => {
  // console.log(JSON.stringify(state), 'state from selector')
  return state.moves.moveArray
}
// const currTile = (state) => state.moves.currTile
const board = (state) => state.board
const defaultState = falseBoard()

const isDraggingArray = createSelector(
  [ moveArray, board ],
  (moveArray, board) => { // eslint-disable-line 
    switch (moveArray) {
    case CHECK_TILE:
      return booleanArray(leavingBoard(moveArray, board))
    default:
      return defaultState
    }
  }
)

export default isDraggingArray
