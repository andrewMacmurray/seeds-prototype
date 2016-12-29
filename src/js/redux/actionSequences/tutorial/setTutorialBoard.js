import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { batch } from '../../_thunkHelpers.js'

export default (board) => (dispatch) => {
  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.setProbabilities, board.probabilities,
      _.setBoardSize, board.size
    ]))
}
