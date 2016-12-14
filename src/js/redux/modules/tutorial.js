import { createAction } from 'redux-actions'

// action types
const SET_TUTORIAL_TEXT = 'SET_TUTORIAL_TEXT'
const SET_BOARD_VISIBILITY = 'SET_BOARD_VISIBILITY'

// reducer
const defaultState = {
  tutorialText: '',
  boardVisibility: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_TUTORIAL_TEXT:
    return {
      ...state,
      tutorialText: action.payload
    }
  case SET_BOARD_VISIBILITY:
    return {
      ...state,
      boardVisibility: action.payload
    }
  default:
    return state
  }
}

// action creators
export const setTutorialText = createAction(SET_TUTORIAL_TEXT, x => x)
export const setBoardVisibility = createAction(SET_BOARD_VISIBILITY, x => x)
