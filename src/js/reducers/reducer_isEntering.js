import { SET_ENTERING, RESET_ENTERING } from '../actions/actionTypes.js'
import { falseBoard, trueBoard } from '../model/constants.js'

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
