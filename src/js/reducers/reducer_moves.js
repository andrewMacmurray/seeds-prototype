import { CHECK_TILE, STOP_DRAG } from '../actions/actionTypes.js'
import { validMove } from '../model/model.js'
const defaultState = { moveArray: [], currTile: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
  case CHECK_TILE:
    const { tile, currTile, board } = action.payload
    const isValid = validMove(tile, currTile, board)

    if (state.moveArray.length === 0) {
      return {
        ...state,
        moveArray: state.moveArray.concat([ tile ]),
        currTile: tile
      }
    }

    if (isValid) {
      return {
        ...state,
        moveArray: state.moveArray.concat([ tile ]),
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
