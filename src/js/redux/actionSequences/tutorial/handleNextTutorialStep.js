import handleSubStep from './handleSubStep.js'

export default () => (dispatch, getState) => {
  const { updating } = getState().tutorial

  if (!updating) return dispatch(handleSubStep())
}
