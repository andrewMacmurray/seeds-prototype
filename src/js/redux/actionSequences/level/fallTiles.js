import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { batch, makeLazyDispatcher } from '../../_thunkHelpers.js'

export default (moveArray) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(_dispatch(_.fallTiles, moveArray))
    .delay(400)
    .then(batch(dispatch, [
      _.shiftTiles, moveArray,
      _.setEntering,
      _.resetMagnitude,
      _.resetLeaving,
      _.resetMoves,
      _.addTiles,
      _.isUpdating, false
    ]))
    .delay(700)
    .then(_dispatch(_.resetEntering))
}
