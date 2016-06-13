import { createSelector } from 'reselect'

import { CHECK_TILE } from '../actions/actionTypes.js'
import { falseBoard, booleanArray, leavingBoard } from '../model/model.js'

const getMoveArray = (state) => {
  // console.log(JSON.stringify(state.moves.moveArray), 'state from selector')
  return state.moves.moveArray
}
// const currTile = (state) => state.moves.currTile
const getBoard = (state) => state.board
const defaultState = falseBoard()

const isDraggingArray = createSelector(
  [ getMoveArray, getBoard ],
  (moveArray, board) =>
    moveArray.length ?
    booleanArray(leavingBoard(moveArray, board)) :
    defaultState
)

export default isDraggingArray
