import { IS_UPDATING } from '../actions/actionTypes.js'

const defaultState = false
export default (state = defaultState, action) => {
  switch (action.type) {
  case IS_UPDATING:
    return action.payload
  default:
    return state
  }
}
