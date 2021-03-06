import { createAction } from 'redux-actions'
import { identity } from 'ramda'

// action types
const SET_TUTORIAL_DATA = 'SET_TUTORIAL_DATA'
const INCREMENT_TUTORIAL_STEP = 'INCREMENT_TUTORIAL_STEP'
const RESET_TUTORIAL_STEP = 'RESET_TUTORIAL_STEP'
const INCREMENT_TUTORIAL_SUBSTEP = 'INCREMENT_TUTORIAL_SUBSTEP'
const RESET_TUTORIAL_SUBSTEP = 'RESET_TUTORIAL_SUBSTEP'
const SET_TUTORIAL_UPDATING = 'SET_TUTORIAL_UPDATING'

// reducer
const defaultState = {
  data: [],
  step: 1,
  substep: 1,
  updating: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_TUTORIAL_DATA:
    return {
      ...state,
      data: action.payload
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
      substep: state.substep + 1
    }
  case RESET_TUTORIAL_SUBSTEP:
    return {
      ...state,
      substep: 1
    }
  case SET_TUTORIAL_UPDATING:
    return {
      ...state,
      updating: action.payload
    }
  default:
    return state
  }
}

// action creators
export const setTutorialData = createAction(SET_TUTORIAL_DATA, identity)
export const incrementTutorialStep = createAction(INCREMENT_TUTORIAL_STEP)
export const resetTutorialStep = createAction(RESET_TUTORIAL_STEP)
export const incrementTutorialSubStep = createAction(INCREMENT_TUTORIAL_SUBSTEP)
export const resetTutorialSubStep = createAction(RESET_TUTORIAL_SUBSTEP)
export const setTutorialUpdating = createAction(SET_TUTORIAL_UPDATING, identity)
