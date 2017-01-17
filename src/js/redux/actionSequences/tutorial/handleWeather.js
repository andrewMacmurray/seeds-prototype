import * as _ from '../../allActions.js'

export default (weatherSettings = {}) => (dispatch, getState) => {
  const state = getState()
  const { subStep } = state.tutorial
  const { step, action, type } = weatherSettings

  const weatherEffect = {
    rain: _.setRaindropsVisibility,
    sun: _.setSunSphereVisibility
  }[type]

  if (action === 'start' && step === subStep) {
    return dispatch(weatherEffect(true))
  }

  if (action === 'stop' && step === subStep) {
    return dispatch(weatherEffect(false))
  }
}
