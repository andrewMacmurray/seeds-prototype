import Promise from 'bluebird'
import * as _ from '../../../allActions.js'
import { makeLazyDispatcher } from '../../../_thunkHelpers.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  const state = getState()
  const {
    remainingWeatherTurns,
    sunSphereVisible,
    raindropsVisible
  } = state.level.weather
  const shouldClear = remainingWeatherTurns === 1

  if (shouldClear && sunSphereVisible) {
    return Promise
      .resolve()
      .then(_dispatch(_.setSunSphereVisibility, false))
      .delay(1000)
      .then(_dispatch(_.clearBackdrop))

  } else if (shouldClear && raindropsVisible) {
    return Promise
      .resolve()
      .then(_dispatch(_.clearBackdrop))
      .delay(1000)
      .then(_dispatch(_.setRaindropsVisibility, false))

  } else {
    return dispatch(_.noop())
  }
}
