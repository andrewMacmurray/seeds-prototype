import { combineReducers } from 'redux'
import setDrag from './reducer_drag.js'
import weather from './reducer_weatherPower.js'

const rootReducer = combineReducers({
  isDragging: setDrag,
  weather
})

export default rootReducer
