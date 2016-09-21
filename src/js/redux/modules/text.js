import { createAction } from 'redux-actions'

// action types
const STEP_INTRO_TEXT = 'STEP_INTRO_TEXT'
const RESET_INTRO_STEP = 'RESET_INTRO_STEP'

// reducer
const defaultState = { introTextStep: 0 }
export default (state = defaultState, action) => {
  switch (action.type) {
  case STEP_INTRO_TEXT:
    return {
      ...state,
      introTextStep: state.introTextStep + 1
    }
  case RESET_INTRO_STEP:
    return {
      ...state,
      introTextStep: 0
    }
  default:
    return state
  }
}

// actions
export const stepIntroText = createAction(STEP_INTRO_TEXT)
export const resetIntroStep = createAction(RESET_INTRO_STEP)
