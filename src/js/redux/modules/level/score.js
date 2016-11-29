// action types
const UPDATE_SCORE = 'UPDATE_SCORE'

// reducer
const defaultState = {
  currentScore: 0,
  levelGoal: 200
}

export default (state = defaultState, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      currentScore: action.payload
    }
  default:
    return state
  }
}

// actions
export const updateScore = (tileType, moves) => (dispatch, getState) => {
  const { level: { score: { currentScore } } } = getState()
  const move = moves.length
  const scores = { pod: currentScore + move }

  const scoreType = scores[tileType] || currentScore
  dispatch({
    type: UPDATE_SCORE,
    payload: moves.length ? scoreType : currentScore
  })
}
