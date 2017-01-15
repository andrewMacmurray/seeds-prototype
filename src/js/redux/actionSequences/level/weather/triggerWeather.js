import Promise from 'bluebird'
import * as _ from '../../../allActions.js'
import { makeLazyDispatcher, batch } from '../../../_thunkHelpers.js'
import setVisibleWeather from './setVisibleWeather.js'

export default (moveType, seedPodCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { rain, sun, weatherThreshold } = getState().level.weather

  const growDelay =
    moveType === 'rain'
      ? 1500
      : 1200

  const backdrop =
    moveType === 'rain'
      ? 'rain-falling'
      : 'sun-shining'

  const weatherMove =
       moveType === 'rain'
    || moveType === 'sun'

  const aboveThreshold =
       rain > weatherThreshold
    || sun > weatherThreshold

  const shouldTriggerWeather = weatherMove && aboveThreshold

  if (shouldTriggerWeather) {
    return Promise
      .resolve()
      .then(_dispatch(setVisibleWeather, moveType))
      .then(batch(dispatch, [
        _.weatherAnimating, true,
        _.setBackdrop, backdrop,
        _.isUpdating, true,
        _.resetWeatherPower, moveType,
        _.setWeatherTurns, 2
      ]))
      .delay(growDelay)
      .then(_dispatch(_.growRandomSeeds, seedPodCount))
      .delay(1000)
      .then(_dispatch(_.growSeedsOnBoard))
      .delay(800)
      .then(batch(dispatch, [
        _.weatherAnimating, false,
        _.resetGrowSeeds,
        _.isUpdating, false
      ]))
  } else {
    return dispatch(_.noop())
  }
}
