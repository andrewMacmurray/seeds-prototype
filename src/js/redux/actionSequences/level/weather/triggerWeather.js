import Promise from 'bluebird'
import * as _ from '../../../allActions.js'
import { makeLazyDispatcher, batch } from '../../../_thunkHelpers.js'
import setVisibleWeather from './setVisibleWeather.js'

export default (moveType) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { rain, sun, threshold } = getState().level.weather

  const backdrop =
    moveType === 'rain'
      ? 'rain-falling'
      : 'sun-shining'

  const weatherMove =
       moveType === 'rain'
    || moveType === 'sun'

  const aboveThreshold =
       rain > threshold
    || sun > threshold

  const shouldTriggerWeather = weatherMove && aboveThreshold

  if (shouldTriggerWeather) {
    return Promise
      .resolve()
      .then(_dispatch(setVisibleWeather, moveType))
      .then(batch(dispatch, [
        _.setBackdrop, backdrop,
        _.resetWeatherPower, moveType,
        _.setWeatherTurns, 2
      ]))
  } else {
    return dispatch(_.noop())
  }
}
