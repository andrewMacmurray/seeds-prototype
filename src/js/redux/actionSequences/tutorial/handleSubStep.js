import * as _ from '../../allActions.js'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import Promise from 'bluebird'
import { contains } from 'ramda'
import { getAutoSteps, getSubStepTotal } from './_helpers.js'

const autoAt = () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { subStep, data, step } = getState().tutorial

  const autoSteps = getAutoSteps(step, data)
  const total = getSubStepTotal(step, data)

  const shouldAutoIncrement = contains(subStep, autoSteps)

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
