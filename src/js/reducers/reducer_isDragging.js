import { CHECK_TILE } from '../actions/actionTypes.js'
import { falseBoard } from '../model/model.js'

const defaultState = falseBoard()
export default (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_TILE:
      

    default:
      return state
  }
}
