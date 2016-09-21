import { UPDATE_SCORE } from '../../actions/actionTypes.js'

export default (state = 0, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return action.payload
  default:
    return state
  }
}
