import * as _ from '../../allActions.js'
import { makeLazyDispatcher, batch } from '../../_thunkHelpers.js'
import Promise from 'bluebird'
import { contains, identity } from 'ramda'
import { getTutorialData } from './_helpers.js'

const autoAt = () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { subStep, data, step } = getState().tutorial

  const { total, autoSteps, board } = getTutorialData(step, data)

  const shouldAutoIncrement = contains(subStep, autoSteps)

  const handleBoard = board && board.step === subStep
    ? Promise
        .resolve()
        .then(batch(dispatch, [
          _.setProbabilities, board.probabilities,
          _.setBoardSize, board.size
        ]))
    : identity

  if (total > 0) {
    if (shouldAutoIncrement) {
      return Promise
      .resolve()
      .then(_dispatch(_.setTutorialUpdating, true))
      .then(_dispatch(_.incrementTutorialSubStep))
      .delay(1000)
      .then(_dispatch(autoAt))

    } else if (subStep === total) {
      return Promise
      .resolve()
      .then(handleBoard)
      .then(_dispatch(_.resetTutorialSubStep))
      .then(_dispatch(_.incrementTutorialStep))
      .delay(1000)
      .then(_dispatch(autoAt))

    } else {
      return Promise
      .resolve()
      .then(_dispatch(_.incrementTutorialSubStep))
      .then(_dispatch(_.setTutorialUpdating, false))
    }
  }

}

export default autoAt
