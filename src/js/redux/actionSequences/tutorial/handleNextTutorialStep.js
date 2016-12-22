import * as _ from '../../allActions.js'
import Promise from 'bluebird'
import { makeLazyDispatcher, batch } from '../../_thunkHelpers.js'
import handleSubStep from './handleSubStep.js'
import { getSubStepTotal } from './_helpers.js'
import { all } from '../../../constants/probabilities.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const { subStep, updating, data, step } = state.tutorial

  const total = getSubStepTotal(step, data)

  if (subStep < total && total > 0 && !updating) {
    return Promise
      .resolve()
      .then(_dispatch(handleSubStep))
      .then(batch(dispatch, [
        _.setBoardSize, 2,
        _.setProbabilities, all.seedlings
      ]))
  }

  if (!updating) {
    return Promise
      .resolve()
      .then(_dispatch(_.incrementTutorialStep))
      .then(_dispatch(_.resetTutorialSubStep))
  }

}
