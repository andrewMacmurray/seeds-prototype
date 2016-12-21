import * as _ from '../../allActions.js'
import Promise from 'bluebird'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import handleSubStep from './handleSubStep.js'
import { getSubStepTotal } from './_helpers.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const { subStep, updating, data, step } = state.tutorial

  const total = getSubStepTotal(step, data)

  if (subStep < total && total > 0 && !updating) {
    return Promise
      .resolve()
      .then(_dispatch(handleSubStep))
  }

  if (!updating) {
    return Promise
      .resolve()
      .then(_dispatch(_.incrementTutorialStep))
      .then(_dispatch(_.resetTutorialSubStep))
  }

}
