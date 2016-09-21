import { combineReducers } from 'redux'
import text from '../modules/reducer_text.js'
import isDragging from '../modules/reducer_setDrag.js'
import updating from '../modules/isUpdating.js'
import weather from '../modules/reducer_weatherPower.js'
import score from '../modules/reducer_score.js'
import view from '../modules/reducer_view.js'
import moves from '../modules/moves.js'
import board from '../modules/board.js'
import fallingMagnitudeArray from '../modules/fallingMagnitude.js'
import growingMoves from '../modules/growingMoves.js'
import isLeavingArray from '../modules/isLeaving.js'
import isEnteringArray from '../modules/isEntering.js'

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
  isEnteringArray
})

export default rootReducer
