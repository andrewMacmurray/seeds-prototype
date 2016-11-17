import { createAction } from 'redux-actions'

// action types
const SET_BACKDROP = 'SET_BACKDROP'
const CLEAR_BACKDROP = 'CLEAR_BACKDROP'

// reducer
const defaultState = ''
export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_BACKDROP:
    return action.payload

  case CLEAR_BACKDROP:
    return ''

  default:
    return state
  }
}

// action creators
export const setBackdrop = createAction(SET_BACKDROP, x => x)
export const clearBackdrop = createAction(CLEAR_BACKDROP)
