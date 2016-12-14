import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import { even } from '../../constants/probabilities.js'

export default (level, goal, levelProgress, avatars) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const seedType = avatars[0]

  if (levelProgress >= level) {
    return Promise
      .resolve()
      .then(_dispatch(_.setSeedType, seedType))
      .then(_dispatch(_.showLoadingScreen))
      .delay(500)
      .then(batch(dispatch, [
        _.setCurrentLevel, level,
        _.setLevelGoal, goal,
        _.shuffleTiles, even,
        _.setView, 'level'
      ]))
      .delay(2500)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
