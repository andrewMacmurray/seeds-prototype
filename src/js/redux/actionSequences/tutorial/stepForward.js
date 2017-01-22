import handleStepForward from './handleStepForward.js'

export default () => (dispatch, getState) => {
  const { updating } = getState().tutorial

  if (!updating) return dispatch(handleStepForward())
}
