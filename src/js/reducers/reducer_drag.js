import { SET_DRAG } from '../actions/actions_index.js'

export default (state = false, action) => {
  switch (action.type) {
    case SET_DRAG:
      return action.payload
    default:
      return state
  }
}
