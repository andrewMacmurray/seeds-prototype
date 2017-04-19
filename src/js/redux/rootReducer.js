import { combineReducers } from 'redux'
import intro from './modules/intro.js'
import tutorial from './modules/tutorial.js'
import audio from './modules/audio.js'
import updating from './modules/isUpdating.js'
import view from './modules/view.js'
import menu from './modules/menu.js'
import backdrop from './modules/backdrop.js'
import loadingScreen from './modules/loadingScreen.js'
import level from './modules/level/_index.js'

const rootReducer = combineReducers({
  intro,
  tutorial,
  audio,
  view,
  menu,
  backdrop,
  updating,
  loadingScreen,
  level
})

export default rootReducer
