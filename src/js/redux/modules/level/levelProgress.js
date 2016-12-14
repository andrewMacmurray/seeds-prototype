import { createAction } from 'redux-actions'

// action types
const INCREMENT_LEVEL_PROGRESS = 'INCREMENT_LEVEL_PROGRESS'

// reducer
const defaultState = 6
export default (state = defaultState, action) => {
  switch (action.type) {
  case INCREMENT_LEVEL_PROGRESS:
    return state + 1

  default:
    return state
  }
}

// action creators
export const incrementLevelProgress = createAction(INCREMENT_LEVEL_PROGRESS)
