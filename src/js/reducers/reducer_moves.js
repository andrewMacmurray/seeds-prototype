import { ADD_TILE } from '../actions/actionTypes.js'
import setDrag from '../actions/actionCreators.js'
import { validMove } from '../model/model.js'
const defaultState = { moveArray: [], currTile: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TILE:
      const { isDragging, tile, currTile, board } = action.payload
      const validMove = isDragging && validMove(tile, currTile, board)

      if (state.moveArray.length === 0 && validMove) {
        return {
          state...,
          moveArray: state.moveArray.concat([currTile])
          currTile,
        }
      }

      if (validMove) {
        return {
          state...,
          moveArray: state.moveArray.concat([currTile]),
          currTile
      }

    default:
      return state
  }
}
