import { createSelector } from 'reselect'
import { booleanArray, transformTiles, falseBoard } from '../../model'
import { _moveArray, _board } from './baseSelectors.js'

const defaultState = falseBoard

const isDraggingArray = createSelector(
  [ _moveArray, _board ],
  (moveArray, board) =>
    moveArray.length > 0 ?
      booleanArray(transformTiles(moveArray, board, 0)) :
      defaultState
)

export default isDraggingArray
