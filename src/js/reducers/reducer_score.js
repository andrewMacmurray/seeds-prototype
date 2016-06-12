import { UPDATE_SCORE } from '../actions/actionTypes.js'

export default (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SCORE:

      const { tileType, moves } = action.payload

      if (tileType === 'pod' && moves.length > 0) {
        const newScore = state += (moves.length * 5)
        return newScore
      } else if (tileType === 'seedling' && moves.length > 0) {
        const newScore = state += moves.length
        return newScore
      }

    default:
      return state
  }
}
