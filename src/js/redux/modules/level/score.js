import { createAction } from 'redux-actions'
import { compose, length, identity } from 'ramda'

// action types
const UPDATE_SCORE = 'UPDATE_SCORE'
const RESET_SCORE = 'RESET_SCORE'
const SET_LEVEL_GOAL = 'SET_LEVEL_GOAL'

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

  case RESET_SCORE:
    return {
      ...state,
      currentScore: 0
    }

  case SET_LEVEL_GOAL:
    return {
      ...state,
      levelGoal: action.payload
    }

  default:
    return state
  }
}

const calculateScore = (x) => 0.091 * x * x + x * 2
// actions
export const updateScore = (tileType, moves) => (dispatch, getState) => {
  const { level: { score: { currentScore } } } = getState()
  // const move = Math.round(calculateScore(moves.length))
  const move = compose(Math.round, calculateScore, length)(moves)
  const scores = { pod: currentScore + move }

  const scoreType = scores[tileType] || currentScore
  dispatch({
    type: UPDATE_SCORE,
    payload: moves.length ? scoreType : currentScore
  })
}

export const resetScore = createAction(RESET_SCORE)
export const setLevelGoal = createAction(SET_LEVEL_GOAL, identity)
