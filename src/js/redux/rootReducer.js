import { combineReducers } from 'redux'
import text from './modules/text.js'
import isDragging from './modules/setDrag.js'
import updating from './modules/isUpdating.js'
import weather from './modules/weatherPower.js'
import score from './modules/score.js'
import view from './modules/view.js'
import moves from './modules/moves.js'
import board from './modules/board.js'
import fallingMagnitudeArray from './modules/fallingMagnitude.js'
import growingMoves from './modules/growingMoves.js'
import isLeavingArray from './modules/isLeaving.js'
import isEnteringArray from './modules/isEntering.js'
import loadingScreen from './modules/loadingScreen.js'

const rootReducer = combineReducers({
  text,
  isDragging,
  weather,
  score,
  view,
  moves,
  board,
  fallingMagnitudeArray,
  isLeavingArray,
  updating,
  growingMoves,
  isEnteringArray,
  loadingScreen
})

export default rootReducer
