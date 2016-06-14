import { createSelector } from 'reselect'
import { falseBoard, booleanArray, leavingBoard } from '../model/model.js'

const getMoveArray = (state) => state.moves.moveArray
const getBoard = (state) => state.board
const defaultState = falseBoard()

const isDraggingArray = createSelector(
  [ getMoveArray, getBoard ],
  (moveArray, board) =>
    moveArray.length > 0 ?
      booleanArray(leavingBoard(moveArray, board)) :
      defaultState
)

export default isDraggingArray
