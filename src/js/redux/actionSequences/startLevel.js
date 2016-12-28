import Promise from 'bluebird'
import * as _ from '../allActions.js'
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
  const loadTutorial = tutorial && levelProgress <= levelNumber

  const setUpView = loadTutorial
    ? () => Promise
        .resolve()
        .then(batch(dispatch, [
          _.resetTutorialStep,
          _.setTutorialData, tutorial.steps
        ]))
    : () => Promise
        .resolve()
        .then(batch(dispatch, [
          _.setLevelGoal, goal,
          _.setProbabilities, probabilities,
          _.setBoardSize, 8,
          _.shuffleTiles, probabilities
        ]))

  const view = loadTutorial
    ? 'tutorial'
    : 'level'

  if (levelProgress >= levelNumber) {
    return Promise
      .resolve()
      .then(_dispatch(_.setSeedType, seedType))
      .then(_dispatch(_.showLoadingScreen))
      .delay(500)
      .then(setUpView)
      .then(batch(dispatch, [
        _.setCurrentLevel, levelNumber,
        _.setCurrentWorld, world
      ]))
      .delay(1500)
      .then(_dispatch(_.setView, view))
      .delay(1000)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
