import Promise from 'bluebird'
import { batch } from '../../_thunkHelpers.js'
import * as _ from '../../allActions.js'

export default (weatherSettings = {}) => (dispatch, getState) => {
  const state = getState()
  const { substep: currentSubstep } = state.tutorial
  const { substep, action, type, threshold } = weatherSettings

  const weatherEffect = {
    rain: _.setRaindropsVisibility,
    sun: _.setSunSphereVisibility
  }[type]

  if (action === 'start' && substep === currentSubstep) {
    return dispatch(weatherEffect(true))
  }

  if (action === 'stop' && substep === currentSubstep) {
    return dispatch(weatherEffect(false))
  }

  if (action === 'threshold' && substep === currentSubstep) {
    return dispatch(_.setWeatherThreshold(threshold))
  }

  if (action === 'reset' && substep === currentSubstep) {
    return Promise
      .resolve()
      .then(batch(dispatch, [
        _.clearBackdrop,
        _.resetWeatherPower, 'sun',
        _.resetWeatherPower, 'rain',
        _.setRaindropsVisibility, false,
        _.setSunSphereVisibility, false
      ]))
  }
}
