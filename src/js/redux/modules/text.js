import { createAction } from 'redux-actions'

// action types
const SET_INTRO_TEXT = 'SET_INTRO_TEXT'
const RESET_INTRO_TEXT = 'RESET_INTRO_TEXT'

// reducer
const defaultState = { introText: '' }
export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_INTRO_TEXT:
    return {
      ...state,
      introText: action.payload
    }
  case RESET_INTRO_TEXT:
    return {
      ...state,
      introText: ''
    }
  default:
    return state
  }
}

// actions
export const setIntroText = createAction(SET_INTRO_TEXT, x => x)
export const resetIntroText = createAction(RESET_INTRO_TEXT)
