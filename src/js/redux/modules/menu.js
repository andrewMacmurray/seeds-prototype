import { createAction } from 'redux-actions'

// action types
const SHOW_MENU = 'SHOW_MENU'
const HIDE_MENU = 'HIDE_MENU'

// reducer
const defaultState = { open: false }

export default (state = defaultState, action) => {
  switch (action.type) {
  case SHOW_MENU:
    return {
      ...state,
      open: true
    }
  case HIDE_MENU:
    return {
      ...state,
      open: false
    }
  default:
    return state
  }
}

// action types
export const openMenu = createAction(SHOW_MENU)
export const closeMenu = createAction(HIDE_MENU)
