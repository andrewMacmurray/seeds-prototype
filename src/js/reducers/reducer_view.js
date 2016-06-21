import { SET_VIEW } from '../actions/actionTypes.js'

export default (state = 'board', action) => {
  switch (action.type) {
  case SET_VIEW:
    return action.payload
  default:
    return state
  }
}
