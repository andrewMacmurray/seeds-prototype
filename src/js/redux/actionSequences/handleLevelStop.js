import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const {
    currentLevel: { level },
    score: { currentScore, levelGoal } } = state.level
  const { levelProgress } = state.level
  const { view } = state

  const handleLevelProgress = level === levelProgress
    ? _dispatch(_.incrementLevelProgress)
    : _dispatch(_.noop)

  if (currentScore >= levelGoal && view === 'level') {
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
