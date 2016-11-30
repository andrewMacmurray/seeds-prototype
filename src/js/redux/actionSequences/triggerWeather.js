import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { identity } from 'ramda'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default (weatherType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { level: { weather: { rain, sun, weatherThreshold } } } = getState()

  const setVisibleWeather = weatherType === 'rain'
    ? _dispatch(_.setRaindropsVisibility, true)
    : identity

  const clearVisibleWeather = weatherType === 'rain'
    ? _dispatch(_.setRaindropsVisibility, false)
    : identity

  const growDelay = weatherType === 'rain'
    ? 1500
    : 1200

  const backdrop = weatherType === 'rain'
    ? 'rain-falling'
    : 'sun-shining'

  if (rain > weatherThreshold || sun > weatherThreshold) {
    Promise
      .resolve()
      .then(setVisibleWeather)
      .then(batch(dispatch, [
        _.weatherAnimating, true,
        _.setBackdrop, backdrop,
        _.isUpdating, true,
        _.resetWeatherPower, weatherType
      ]))
      .delay(growDelay)
      .then(_dispatch(_.growRandomSeeds, seedlingCount))
      .delay(1000)
      .then(_dispatch(_.growSeedsOnBoard))
      .delay(800)
      .then(batch(dispatch, [
        _.weatherAnimating, false,
        _.resetGrowSeeds,
        _.isUpdating, false
      ]))
      .delay(500)
      .then(_dispatch(_.clearBackdrop))
      .delay(1000)
      .then(clearVisibleWeather)
  }
  // return to carry on promise chain in stopDrag action sequence
  return ''
}
