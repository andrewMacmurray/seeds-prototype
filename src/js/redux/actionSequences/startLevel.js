import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher } from '../_thunkHelpers.js'

export default (level, goal, levelProgress) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  if (levelProgress >= level) {
    return Promise
    .resolve()
    .then(_dispatch(_.showLoadingScreen))
    .delay(500)
    .then(_dispatch(_.setLevelGoal, goal))
    .then(_dispatch(_.setCurrentLevel, level))
    .then(_dispatch(_.setView, 'board'))
    .delay(2500)
    .then(_dispatch(_.hideLoadingScreen))
  }
}
