import { createAction } from 'redux-actions'

// action types
const SET_CURRENT_LEVEL = 'SET_CURRENT_LEVEL'

// reducer
const defaultState = 1
export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_CURRENT_LEVEL:
    return action.payload

  default:
    return state
  }
}

// action creators
export const setCurrentLevel = createAction(SET_CURRENT_LEVEL, x => x)
