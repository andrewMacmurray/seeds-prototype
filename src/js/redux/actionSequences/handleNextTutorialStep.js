import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, conditionalDispatcher } from '../_thunkHelpers.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const dispatchIf = conditionalDispatcher(dispatch)

  const { tutorial } = getState()
  const { step, steps: tutorialData } = tutorial
  const { text, board: { size, probabilities } } = tutorialData[step]

  const handleIncrement = dispatchIf(text, _.incrementTutorialStep)
  const handleProbs = dispatchIf(probabilities, _.setProbabilities, probabilities)
  const handleSize = dispatchIf(size, _.setBoardSize, size)

  if (step < tutorialData.length - 1) {
    Promise
      .resolve()
      .then(_dispatch(_.setRenderBlip, true))
      .delay(600)
      .then(handleIncrement)
      .then(handleProbs)
      .then(handleSize)
      .then(_dispatch(_.setRenderBlip, false))
  }
}
