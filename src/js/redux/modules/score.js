// action types
const UPDATE_SCORE = 'UPDATE_SCORE'

// reducer
export default (state = 0, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return action.payload
  default:
    return state
  }
}

// actions
export const updateScore = (tileType, moves) => (dispatch, getState) => {
  const { score } = getState()
  const scores = {
    pod: score + moves.length * 5,
    seedling: score + moves.length
  }
  const scoreType = scores[tileType] || score
  dispatch({
    type: UPDATE_SCORE,
    payload: moves.length ? scoreType : score
  })
}
