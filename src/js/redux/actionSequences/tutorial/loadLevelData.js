import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher, batch } from '../../_thunkHelpers.js'

export default (goal, probabilities) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.showLoadingScreen,
      _.setLevelGoal, goal,
      _.setProbabilities, probabilities,
      _.setBoardSize, 8,
      _.resetScore,
      _.resetWeatherPower, 'rain',
      _.resetWeatherPower, 'sun',
      _.resetTutorialStep,
      _.resetTutorialSubStep
    ]))
    .delay(2000)
    .then(_dispatch(_.setView, 'level'))
    .delay(1000)
    .then(_dispatch(_.hideLoadingScreen))
}
