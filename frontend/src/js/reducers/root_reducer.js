import { combineReducers } from 'redux'
import setDrag from './reducer_drag.js'

const rootReducer = combineReducers({
  isDragging: setDrag
})

export default rootReducer
