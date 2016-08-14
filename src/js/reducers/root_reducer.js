import { combineReducers } from 'redux'
import isDragging from './reducer_setDrag.js'
import updating from './reducer_isUpdating.js'
import weather from './reducer_weatherPower.js'
import score from './reducer_score.js'
import view from './reducer_view.js'
import moves from './reducer_moves.js'
import board from './reducer_board.js'
import fallingMagnitudeArray from './reducer_fallingMagnitude.js'
import growingMoves from './reducer_growingMoves.js'
import isLeavingArray from './reducer_isLeaving.js'
import isEnteringArray from './reducer_isEntering.js'

const rootReducer = combineReducers({
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
