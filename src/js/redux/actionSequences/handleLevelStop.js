import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import { identity } from 'ramda'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const {
    currentLevel: { level },
    levelProgress,
    score: { currentScore, levelGoal } } = getState().level

  const handleLevelProgress = level === levelProgress
    ? _dispatch(_.incrementLevelProgress)
    : identity

  if (currentScore >= levelGoal) {
    return Promise
      .resolve()
      .then(_dispatch(_.showLoadingScreen, Math.random()))
      .delay(500)
      .then(handleLevelProgress)
      .then(batch(dispatch, [
        _.resetScore,
        _.setView, 'hub',
        _.resetWeatherPower, 'rain',
        _.resetWeatherPower, 'sun'
      ]))
      .delay(2500)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
