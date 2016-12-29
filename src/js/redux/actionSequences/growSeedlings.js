import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { batch, makeLazyDispatcher } from '../_thunkHelpers.js'

export default (moveArray) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  const growDelay = moveArray.length > 10
    ? 1000
    : 800

  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.setDrag, false,
      _.isUpdating, true,
      _.setGrowingSeeds, moveArray
    ]))
    .delay(growDelay)
    .then(_dispatch(_.growSeedsFromMoves, moveArray))
    .delay(growDelay)
    .then(batch(dispatch, [
      _.isUpdating, false,
      _.resetGrowSeeds,
      _.resetMoves
    ]))
}
