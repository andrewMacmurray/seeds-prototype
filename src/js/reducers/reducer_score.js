import { UPDATE_SCORE } from '../actions/actions_index.js'

export default (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SCORE:

      const { tileType, moves } = action.payload

      if (tileType === 'pod' && moves.length > 0) {
        return state += (moves.length * 5)
      } else if (tileType === 'seedling' && moves.length > 0) {
        return state += moves.length
      }

    default:
      return state
  }
}
