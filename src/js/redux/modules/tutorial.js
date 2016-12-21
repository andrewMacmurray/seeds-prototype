import { createAction } from 'redux-actions'

// action types
const SET_TUTORIAL_DATA = 'SET_TUTORIAL_DATA'
const INCREMENT_TUTORIAL_STEP = 'INCREMENT_TUTORIAL_STEP'
const RESET_TUTORIAL_STEP = 'RESET_TUTORIAL_STEP'
const INCREMENT_TUTORIAL_SUBSTEP = 'INCREMENT_TUTORIAL_SUBSTEP'
const RESET_TUTORIAL_SUBSTEP = 'RESET_TUTORIAL_SUBSTEP'
const SET_TUTORIAL_UPDATING = 'SET_TUTORIAL_UPDATING'
const SET_RENDER_BLIP = 'SET_RENDER_BLIP'

// reducer
const defaultState = {
  steps: [],
  step: 1,
  subStep: 1,
  updating: false,
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
      step: 1
    }
  case INCREMENT_TUTORIAL_SUBSTEP:
    return {
      ...state,
      subStep: state.subStep + 1
    }
  case RESET_TUTORIAL_SUBSTEP:
    return {
      ...state,
      subStep: 1
    }
  case SET_TUTORIAL_UPDATING:
    return {
      ...state,
      updating: action.payload
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
export const incrementTutorialSubStep = createAction(INCREMENT_TUTORIAL_SUBSTEP)
export const resetTutorialSubStep = createAction(RESET_TUTORIAL_SUBSTEP)
export const setTutorialUpdating = createAction(SET_TUTORIAL_UPDATING, x => x)
export const setRenderBlip = createAction(SET_RENDER_BLIP, x => x)
