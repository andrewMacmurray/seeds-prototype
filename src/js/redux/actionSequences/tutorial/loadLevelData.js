import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'

export default (goal, probabilities) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(_dispatch(_.showLoadingScreen))
    .then(_dispatch(_.setLevelGoal, goal))
    .then(_dispatch(_.setProbabilities, probabilities))
    .then(_dispatch(_.setBoardSize, 8))
    .then(_dispatch(_.resetScore))
    .then(_dispatch(_.resetWeatherPower, 'rain'))
    .then(_dispatch(_.resetWeatherPower, 'sun'))
    .then(_dispatch(_.resetTutorialStep))
    .then(_dispatch(_.resetTutorialSubStep))
    .delay(2000)
    .then(_dispatch(_.setView, 'level'))
    .delay(1000)
    .then(_dispatch(_.hideLoadingScreen))
}
