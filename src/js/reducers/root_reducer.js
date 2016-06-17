import { combineReducers } from 'redux'
import isDragging from './reducer_setDrag.js'
import updating from './reducer_isUpdating.js'
import weather from './reducer_weatherPower.js'
import score from './reducer_score.js'
import view from './reducer_view.js'
import moves from './reducer_moves.js'
import board from './reducer_board.js'
import fallingMagnitude from './reducer_fallingMagnitude.js'
import leaving from './reducer_isLeaving.js'

const rootReducer = combineReducers({
  isDragging,
  weather,
  score,
  view,
  moves,
  board,
  fallingMagnitude,
  leaving,
  updating
})

export default rootReducer
