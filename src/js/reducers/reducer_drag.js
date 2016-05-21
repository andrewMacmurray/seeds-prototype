import { SET_DRAG } from '../actions/actionTypes.js'

export default (state = false, action) => {
  switch (action.type) {
    case SET_DRAG:
      return action.payload.isDragging
    default:
      return state
  }
}
