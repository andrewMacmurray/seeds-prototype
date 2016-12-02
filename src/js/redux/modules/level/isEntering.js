import { createAction } from 'redux-actions'
import { falseBoard, trueBoard, booleanArray } from '../../../model'

// action types
const SET_ENTERING = 'SET_ENTERING'
const RESET_ENTERING = 'RESET_ENTERING'

// reducer
const defaultState = trueBoard
export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_ENTERING:
    return action.payload

  case RESET_ENTERING:
    return falseBoard

  default:
    return state
  }
}

// actions
export const setEntering = () => (dispatch, getState) => {
  const { tiles } = getState().level.board
  dispatch({
    type: SET_ENTERING,
    payload: booleanArray(tiles)
  })
}

export const resetEntering = createAction(RESET_ENTERING)
