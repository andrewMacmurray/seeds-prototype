import * as _ from '../../allActions.js'

export default (weatherSettings = {}) => (dispatch, getState) => {
  const state = getState()
  const { substep: currentSubstep } = state.tutorial
  const { substep, action, type } = weatherSettings

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
}
