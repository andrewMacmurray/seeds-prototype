import Promise from 'bluebird'
import { batch } from '../../_thunkHelpers.js'
import * as _ from '../../allActions.js'

export default (goal, probabilities, boardSize = 8) => (dispatch) => {
  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.setLevelGoal, goal,
      _.setProbabilities, probabilities,
      _.setBoardSize, boardSize,
      _.shuffleTiles, probabilities
    ]))
}
