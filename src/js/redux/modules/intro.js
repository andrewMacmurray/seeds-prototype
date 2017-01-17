import { createAction } from 'redux-actions'
import { identity } from 'ramda'

// action types
const SET_VISIBLE_INTRO_TEXT = 'SET_VISIBLE_INTRO_TEXT'
const RESET_INTRO_TEXT = 'RESET_INTRO_TEXT'
const SET_VISIBLE_SEEDS = 'SET_VISIBLE_SEEDS'

// reducer
const defaultState = {
  visibleText: [ 0, 0, 0 ],
  visibleSeeds: [ 0, 0, 0, 0, 0 ]
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SET_VISIBLE_INTRO_TEXT:
    return {
      ...state,
      visibleText: action.payload
    }
  case RESET_INTRO_TEXT:
    return {
      ...state,
      visibleText: defaultState.visibleText
    }
  case SET_VISIBLE_SEEDS:
    return {
      ...state,
      visibleSeeds: action.payload
    }
  default:
    return state
  }
}

// actions
export const setVisibleIntroText = createAction(SET_VISIBLE_INTRO_TEXT, identity)
export const resetIntroText = createAction(RESET_INTRO_TEXT)
export const setVisibleSeeds = createAction(SET_VISIBLE_SEEDS, identity)
