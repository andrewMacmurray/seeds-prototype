import { combineReducers } from 'redux'
import setDrag from './reducer_drag.js'
import weather from './reducer_weatherPower.js'
import score from './reducer_score.js'

const rootReducer = combineReducers({
  isDragging: setDrag,
  weather,
  score
})

export default rootReducer
