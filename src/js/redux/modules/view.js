import { closeMenu } from './menu.js'

// action types
const SET_VIEW = 'SET_VIEW'

// reducer
export default (state = 'title', action) => {
  switch (action.type) {
  case SET_VIEW:
    return action.payload
  default:
    return state
  }
}

// actions
export const setView = (view) => (dispatch) => {
  dispatch(closeMenu())
  dispatch({
    type: SET_VIEW,
    payload: view
  })
}
