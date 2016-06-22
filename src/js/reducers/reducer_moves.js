import { CHECK_TILE, STOP_DRAG } from '../actions/actionTypes.js'
import { validMove } from '../model/model.js'
const defaultState = { moveArray: [], currTile: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
  case CHECK_TILE:
    const { tile, currTile, board } = action.payload
    const { moveArray } = state
    const isValid = validMove(tile, currTile, board)

    if (moveArray.length === 0) {
      return {
        moveArray: moveArray.concat([ tile ]),
        currTile: tile
      }
    }

    if (isValid) {
      return {
        moveArray: moveArray.concat([ tile ]),
        currTile: tile
      }
    }

    return state

  case STOP_DRAG:
    return defaultState

  default:
    return state
  }
}
