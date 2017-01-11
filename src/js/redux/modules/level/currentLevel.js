import { createAction } from 'redux-actions'

// action types
const SET_CURRENT_LEVEL = 'SET_CURRENT_LEVEL'
const SET_CURRENT_WORLD = 'SET_CURRENT_WORLD'

// reducer
const defaultState = {
  level: 1,
  world: 1
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_CURRENT_LEVEL:
    return {
      ...state,
      level: action.payload
    }
  case SET_CURRENT_WORLD:
    return {
      ...state,
      world: action.payload
    }
  default:
    return state
  }
}

// action creators
export const setCurrentLevel = createAction(SET_CURRENT_LEVEL, x => x)
export const setCurrentWorld = createAction(SET_CURRENT_WORLD, x => x)
