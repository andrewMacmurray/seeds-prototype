import { FALL_TILES, RESET_MAGNITUDE } from '../actions/actionTypes.js'
import { transformBoard, removeSeeds } from '../model/model.js'
import { falseBoard } from '../model/constants.js'
import { mapFallingTiles } from '../model/mapFallingTiles.js'

const defaultState = falseBoard
export default (state = defaultState, action) => {
  switch (action.type) {
  case FALL_TILES:
    return action.payload

  case RESET_MAGNITUDE:
    return defaultState

  default:
    return state
  }
}
