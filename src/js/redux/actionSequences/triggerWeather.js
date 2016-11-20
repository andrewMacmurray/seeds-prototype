import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { identity } from 'ramda'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default (weatherType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const {
    updating,
    weather: { rain, sun }
  } = getState()

  const setVisibleWeather = weatherType === 'rain'
    ? _dispatch(_.setRaindropsVisibility, true)
    : identity

  const clearVisibleWeather = weatherType === 'rain'
    ? _dispatch(_.setRaindropsVisibility, false)
    : identity

  const growDelay = weatherType === 'rain'
    ? 1500
    : 700

  const backdrop = weatherType === 'rain'
    ? 'rain-falling'
    : 'sun-shining'

  if (rain > 8 || sun > 8 && !updating) {
    Promise
      .resolve()
      .then(setVisibleWeather)
      .then(batch(dispatch, [
        _.setBackdrop, backdrop,
        _.isUpdating, true,
        _.resetWeather, weatherType
      ]))
      .delay(growDelay)
      .then(_dispatch(_.growRandomSeeds, seedlingCount))
      .delay(700)
      .then(_dispatch(_.growSeedsOnBoard))
      .delay(500)
      .then(batch(dispatch, [
        _.resetGrowSeeds,
        _.isUpdating, false
      ]))
      .delay(500)
      .then(_dispatch(_.clearBackdrop))
      .delay(1000)
      .then(clearVisibleWeather)
  }
}
