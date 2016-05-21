import { CHECK_TILE } from '../actions/actionTypes.js'
import { validMove } from '../model/model.js'
const defaultState = { moveArray: [], currTile: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_TILE:
      const { isDragging, tile, currTile, board } = action.payload
      const isValid = isDragging && validMove(tile, currTile, board)

      if (state.moveArray.length === 0) {
        return {
          ...state,
          moveArray: state.moveArray.concat([tile]),
          currTile: tile,
        }
      }

      if (isValid) {
        return {
          ...state,
          moveArray: state.moveArray.concat([tile]),
          currTile: tile
        }
      }

    default:
      return state
  }
}
