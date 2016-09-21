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
export const updateScore = (tileType) => (dispatch, getState) => {
  const { moves: { moveArray }, score } = getState()
  const scores = {
    pod: score + moveArray.length * 5,
    seedling: score + moveArray.length
  }
  const scoreType = scores[tileType] || score
  dispatch({
    type: UPDATE_SCORE,
    payload: moveArray.length ? scoreType : score
  })
}
