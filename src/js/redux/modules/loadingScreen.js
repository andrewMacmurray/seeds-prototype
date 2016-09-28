import { createAction } from 'redux-actions'

// action types
const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'

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
      visible: true,
      background: action.payload
    }
  case HIDE_LOADING:
    return {
      ...state,
      visible: false
    }
  default:
    return state
  }
}

// action creators
export const showLoadingScreen = createAction(SHOW_LOADING, x => x)
export const hideLoadingScreen = createAction(HIDE_LOADING)
