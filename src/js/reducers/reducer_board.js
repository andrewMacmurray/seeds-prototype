import { CHECK_TILE, START_DRAG, STOP_DRAG } from '../actions/actionTypes.js'
import movesReducer from './reducer_moves.js'
import { randomBoard } from '../model/model.js'

const defaultState = randomBoard()

export default (state = defaultState, action) => {
    switch (action.type) {
    case UPDATE_BOARD:
      return state
    default:
      return state
  }
}
