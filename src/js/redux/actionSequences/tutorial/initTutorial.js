import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher, batch } from '../../_thunkHelpers.js'
import stepForward from './stepForward.js'

export default (tutorialData) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.setTutorialData, tutorialData,
      _.resetTutorialStep,
      _.resetTutorialSubStep
    ]))
    .delay(500)
    .then(_dispatch(stepForward))
}
