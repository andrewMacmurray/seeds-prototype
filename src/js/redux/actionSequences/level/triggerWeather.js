import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher, batch } from '../../_thunkHelpers.js'

export default (moveType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { rain, sun, weatherThreshold } = getState().level.weather

  const setVisibleWeather = moveType === 'rain'
    ? _dispatch(_.setRaindropsVisibility, true)
    : _dispatch(_.setSunSphereVisibility, true)

  const clearVisibleWeather = moveType === 'rain'
    ? _dispatch(_.setRaindropsVisibility, false)
    : _dispatch(_.setSunSphereVisibility, false)

  const growDelay = moveType === 'rain'
    ? 1500
    : 1200

  const backdrop = moveType === 'rain'
    ? 'rain-falling'
    : 'sun-shining'

  const weatherMove = moveType === 'rain' || moveType === 'sun'
  const aboveThreshold = rain > weatherThreshold || sun > weatherThreshold
  const shouldTriggerWeather = weatherMove && aboveThreshold

  if (shouldTriggerWeather) {
    return Promise
      .resolve()
      .then(setVisibleWeather)
      .then(batch(dispatch, [
        _.weatherAnimating, true,
        _.setBackdrop, backdrop,
        _.isUpdating, true,
        _.resetWeatherPower, moveType
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
  } else {
    return dispatch(_.noop())
  }
}
