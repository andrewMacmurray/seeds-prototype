import { CHECK_TILE, START_DRAG, STOP_DRAG } from '../actions/actionTypes.js'
import movesReducer from './reducer_moves.js'
import { randomBoard } from '../model/model.js'

const defaultState = {
  isDragging: false,
  board: randomBoard(),
  moveArray: [],
  currTile: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case START_DRAG:

    const tile = action.payload.tile

    if (tile) {
      return {
        ...state,
        isDragging: true,
        moveArray: state.moveArray.concat([tile]),
        currTile: state.currTile.concat([tile])
      }
    }
    return state

    case CHECK_TILE:

    if (state.isDragging) {
      const tileToCheck = action.payload
      const { currTile, moveArray } = state
      const stateToCheck = {
        currTile,
        moveArray
      }
      const checkTileAction = {
        type: CHECK_TILE,
        payload: {
          isDragging: state.isDragging,
          tile: tileToCheck,
          currTile: currTile,
          board: state.board
        }
      }
      const { newCurrTile, newMoveArray } = movesReducer(stateToCheck, checkTileAction)
      return {
        ...state,
        currTile: newCurrTile,
        moveArray: newMoveArray
      }
    }

    case STOP_DRAG:



    default:
      return state
  }
}
