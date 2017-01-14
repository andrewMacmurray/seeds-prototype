import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { batch, makeLazyDispatcher } from '../../_thunkHelpers.js'

export default (moveArray) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { remainingWeatherTurns } = getState().level.weather

  const growDelay = moveArray.length > 10
    ? 1000
    : 800

  const handleGrow = () => remainingWeatherTurns > 0
    ? Promise
        .resolve()
        .then(_dispatch(_.growSeedsFromMoves, moveArray))
        .delay(growDelay)
    : _dispatch(_.noop)

  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.setDrag, false,
      _.isUpdating, true,
      _.setGrowingSeeds, moveArray
    ]))
    .delay(growDelay)
    .then(handleGrow)
    .then(batch(dispatch, [
      _.isUpdating, false,
      _.resetGrowSeeds,
      _.resetMoves
    ]))
}
