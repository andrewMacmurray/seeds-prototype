import { createAction } from 'redux-actions'
import { identity } from 'ramda'

// action types
const SET_VIEW = 'SET_VIEW'

// reducer
export default (state = 'title', action) => {
  switch (action.type) {
  case SET_VIEW:
    return action.payload
  default:
    return state
  }
}

// actions
export const setView = createAction(SET_VIEW, identity)
