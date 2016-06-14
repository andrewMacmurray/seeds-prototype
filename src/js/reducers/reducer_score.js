import { UPDATE_SCORE } from '../actions/actionTypes.js'

export default (state = 0, action) => {
  switch (action.type) {
  case UPDATE_SCORE:

    const { tileType, moves } = action.payload
    let currScore = state

    if (tileType === 'pod' && moves.length > 0) {
      const newScore = currScore += moves.length * 5
      return newScore
    } else if (tileType === 'seedling' && moves.length > 0) {
      const newScore = currScore += moves.length
      return newScore
    }
    return state

  default:
    return state
  }
}
