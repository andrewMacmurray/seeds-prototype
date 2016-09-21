import { createAction } from 'redux-actions'

// action types
const IS_UPDATING = 'IS_UPDATING'

// reducer
const defaultState = false
export default (state = defaultState, action) => {
  switch (action.type) {
  case IS_UPDATING:
    return action.payload
  default:
    return state
  }
}

// actions
export const isUpdating = createAction(IS_UPDATING, x => x)
