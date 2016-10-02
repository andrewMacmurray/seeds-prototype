import { createAction } from 'redux-actions'

// action types
const PLAY_AUDIO = 'START_AUDIO'
const STOP_AUDIO = 'STOP_AUDIO'

// reducer
const defaultState = { playing: false }
export default (state = defaultState, action) => {
  switch (action.type) {
  case PLAY_AUDIO:
    return {
      ...state,
      playing: true
    }
  case STOP_AUDIO:
    return {
      ...state,
      playing: false
    }
  default:
    return state
  }
}

// action creators
export const playAudio = createAction(PLAY_AUDIO)
export const stopAudio = createAction(STOP_AUDIO)
