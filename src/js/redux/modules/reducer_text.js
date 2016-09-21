import { STEP_INTRO_TEXT, RESET_INTRO_STEP } from '../../actions/actionTypes.js'

const defaultState = {
  introTextStep: 0
}

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
