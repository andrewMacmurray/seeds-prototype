import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default (weatherType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { weather: { rain, sun } } = getState()

  const setVisibleWeather = weatherType === 'rain'
    ? _dispatch(_.setRainingState, true)
    : x => x

  const growDelay = weatherType === 'rain'
    ? 1500
    : 700

  if (rain > 8 || sun > 8) {
    Promise
      .resolve()
      .then(setVisibleWeather)
      .then(batch(dispatch, [
        _.isUpdating, true,
        _.resetWeather, weatherType
      ]))
      .delay(growDelay)
      .then(_dispatch(_.growSeeds, seedlingCount))
      .delay(700)
      .then(_dispatch(_.growSeedsOnBoard))
      .delay(500)
      .then(_dispatch(_.resetGrowSeeds))
      .then(_dispatch(_.isUpdating, false))
      .delay(1500)
      .then(_dispatch(_.setRainingState, false))
  }
}
