import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher } from '../_thunkHelpers.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { currentScore, levelGoal } = getState().level.score

  if (currentScore >= levelGoal) {
    return Promise
      .resolve()
      .then(_dispatch(_.showLoadingScreen, Math.random()))
      .delay(500)
      .then(_dispatch(_.resetScore))
      .then(_dispatch(_.incrementLevelProgress))
      .then(_dispatch(_.setView, 'hub'))
      .delay(2500)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
