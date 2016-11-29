import { combineReducers } from 'redux'
import isDragging from './setDrag.js'
import weather from './weather.js'
import score from './score.js'
import moves from './moves.js'
import board from './board.js'
import fallingMagnitudeArray from './fallingMagnitude.js'
import growingMoves from './growingMoves.js'
import isLeavingArray from './isLeaving.js'
import isEnteringArray from './isEntering.js'

module.exports = combineReducers({
  isDragging,
  weather,
  score,
  moves,
  board,
  fallingMagnitudeArray,
  isLeavingArray,
  growingMoves,
  isEnteringArray,
})
