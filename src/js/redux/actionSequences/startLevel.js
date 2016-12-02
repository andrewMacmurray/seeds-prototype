import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import { even } from '../../constants/probabilities.js'

export default (level, goal, levelProgress) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  if (levelProgress >= level) {
    return Promise
      .resolve()
      .then(_dispatch(_.showLoadingScreen))
      .delay(500)
      .then(batch(dispatch, [
        _.setCurrentLevel, level,
        _.setLevelGoal, goal,
        _.shuffleTiles, even,
        _.setView, 'board'
      ]))
      .delay(2500)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
