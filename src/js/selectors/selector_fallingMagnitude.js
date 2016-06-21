import { createSelector } from 'reselect'
import { STOP_DRAG, RESET_MAGNITUDE } from '../actions/actionTypes.js'
import { falseBoard, transformBoard } from '../model/model.js'
import { mapFallingTiles } from '../model/mapFallingTiles.js'

const board = (state) => state.board
const moveArray = (state) => state.moves.moveArray
const isLeavingArray = (state) => state.isLeavingArray

const defaultState = falseBoard()
const fallingMagnitudeArray = createSelector(
  [ board, moveArray, isLeavingArray ],
  (board, moveArray, isLeavingArray) => { // eslint-disable-line
    switch (isLeavingArray) {
    case STOP_DRAG:
      return mapFallingTiles(transformBoard(moveArray, board, 0))
    case RESET_MAGNITUDE:
      return defaultState
    default:
      return defaultState
    }
  }
)

export default fallingMagnitudeArray
