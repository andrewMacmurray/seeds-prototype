import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { identity } from 'ramda'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default ({
  levelNumber,
  probabilities,
  world,
  goal,
  levelProgress,
  avatars,
  tutorial
}) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const seedType = avatars[0]

  const loadTutorial = tutorial
    ? () => Promise
        .resolve()
        .then(batch(dispatch, [
          _.resetTutorialStep,
          _.setTutorialData, tutorial.steps
        ]))
    : identity

  const view = tutorial ? 'tutorial' : 'level'

  if (levelProgress >= levelNumber) {
    return Promise
      .resolve()
      .then(_dispatch(_.setSeedType, seedType))
      .then(_dispatch(_.showLoadingScreen))
      .then(loadTutorial)
      .delay(500)
      .then(batch(dispatch, [
        _.setCurrentLevel, levelNumber,
        _.setCurrentWorld, world,
        _.setLevelGoal, goal,
        _.setProbabilities, probabilities,
        _.setBoardSize, 8,
        _.shuffleTiles, probabilities,
        _.setView, view
      ]))
      .delay(2500)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
