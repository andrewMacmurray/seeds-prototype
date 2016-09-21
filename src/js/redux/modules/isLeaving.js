import { createAction } from 'redux-actions'
import { transformBoard, booleanArray, removeSeedsFromBoard } from '../../model/model.js'
import { falseBoard } from '../../model/constants.js'

// action types
const STOP_DRAG = 'STOP_DRAG'
const RESET_LEAVING = 'RESET_LEAVING'
const REMOVE_SEEDS = 'REMOVE_SEEDS'

// reducer
const defaultState = falseBoard
export default (state = defaultState, action) => {
  switch (action.type) {
  case RESET_LEAVING:
    return defaultState

  case STOP_DRAG:
    return action.payload

  case REMOVE_SEEDS:
    return action.payload

  default:
    return state
  }
}

// actions
export const resetLeaving = createAction(RESET_LEAVING)

export const stopDrag = createAction(
  STOP_DRAG,
  (board, moves) => booleanArray(transformBoard(moves, board, 0))
)

export const removeSeeds = createAction(
  REMOVE_SEEDS,
  board => booleanArray(removeSeedsFromBoard(board))
)
