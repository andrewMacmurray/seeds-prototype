import { combineReducers } from 'redux'
import intro from './modules/intro.js'
import audio from './modules/audio.js'
import updating from './modules/isUpdating.js'
import view from './modules/view.js'
import backdrop from './modules/backdrop.js'
import loadingScreen from './modules/loadingScreen.js'
import level from './modules/level/_index.js'

const rootReducer = combineReducers({
  intro,
  audio,
  view,
  backdrop,
  updating,
  loadingScreen,
  level
})

export default rootReducer
