import { createAction } from 'redux-actions'

// action types
const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'
const SET_LOADING_BACKGROUND = 'SET_LOADING_BACKGROUND'

// reducer
const defaultState = {
  visible: false,
  background: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case SHOW_LOADING:
    return {
      ...state,
      visible: true
    }
  case HIDE_LOADING:
    return {
      ...state,
      visible: false
    }
  case SET_LOADING_BACKGROUND:
    return {
      ...state,
      background: action.payload
    }
  default:
    return state
  }
}

// action creators
export const showLoadingScreen = createAction(SHOW_LOADING)
export const hideLoadingScreen = createAction(HIDE_LOADING)
export const setLoadingBackground = createAction(SET_LOADING_BACKGROUND)
