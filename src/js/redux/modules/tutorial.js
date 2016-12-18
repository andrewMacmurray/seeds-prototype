import { createAction } from 'redux-actions'

// action types
const SET_TUTORIAL_DATA = 'SET_TUTORIAL_DATA'
const INCREMENT_TUTORIAL_STEP = 'INCREMENT_TUTORIAL_STEP'
const RESET_TUTORIAL_STEP = 'RESET_TUTORIAL_STEP'
const SET_RENDER_BLIP = 'SET_RENDER_BLIP'

// reducer
const defaultState = {
  steps: [],
  step: 0,
  renderBlip: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_TUTORIAL_DATA:
    return {
      ...state,
      steps: action.payload
    }
  case INCREMENT_TUTORIAL_STEP:
    return {
      ...state,
      step: state.step + 1
    }
  case RESET_TUTORIAL_STEP:
    return {
      ...state,
      step: 0
    }
  case SET_RENDER_BLIP:
    return {
      ...state,
      renderBlip: action.payload
    }
  default:
    return state
  }
}

// action creators
export const setTutorialData = createAction(SET_TUTORIAL_DATA, x => x)
export const incrementTutorialStep = createAction(INCREMENT_TUTORIAL_STEP)
export const resetTutorialStep = createAction(RESET_TUTORIAL_STEP)
export const setRenderBlip = createAction(SET_RENDER_BLIP, x => x)
