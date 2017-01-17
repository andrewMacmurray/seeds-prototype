import { createAction } from 'redux-actions'
import { identity } from 'ramda'

// action types
const SET_SEED_TYPE = 'SET_SEED_TYPE'

// reducer
const defaultState = 'sunflower'
export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_SEED_TYPE:
    return action.payload
  default:
    return state
  }
}

// action creators
export const setSeedType = createAction(SET_SEED_TYPE, identity)
