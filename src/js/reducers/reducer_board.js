import { SHIFT_TILES, ADD_TILES } from '../actions/actionTypes.js'
import movesReducer from './reducer_moves.js'
import { randomBoard } from '../model/model.js'

const defaultState = randomBoard()

export default (state = defaultState, action) => {
    switch (action.type) {
      case SHIFT_TILES:
        return state

      case ADD_TILES:
        return state

      default:
        return state
  }
}
