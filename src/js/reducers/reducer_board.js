import { SHIFT_TILES, ADD_TILES, TRANSFORM_BOARD } from '../actions/actionTypes.js'
import {
  randomBoard,
  addNewTiles,
} from '../model/model.js'

const defaultState = randomBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
  case SHIFT_TILES:
    return action.payload

  case ADD_TILES:
    return action.payload

  case TRANSFORM_BOARD:
    return action.payload

  default:
    return state
  }
}
