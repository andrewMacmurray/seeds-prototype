import { createSelector } from 'reselect'
import { STOP_DRAG, RESET_MAGNITUDE } from '../actions/actionTypes.js'
import { transformBoard } from '../model/model.js'
import { falseBoard } from '../model/constants.js'
import { mapFallingTiles } from '../model/mapFallingTiles.js'

const _board = (state) => state.board
const _moveArray = (state) => state.moves.moveArray
const _isLeavingArray = (state) => state.isLeavingArray

const defaultState = falseBoard
const fallingMagnitudeArray = createSelector(
  [ _board, _moveArray, _isLeavingArray ],
  (board, moveArray, isLeavingArray) => {
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
