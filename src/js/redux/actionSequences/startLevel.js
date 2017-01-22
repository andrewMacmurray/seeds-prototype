import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import { getLevelData } from './dataHelpers/levelDataHelpers.js'
import setUpBoard from './level/setUpBoard.js'

export default (world, levelNumber) => (dispatch, getState, levelSettings) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { level } = getState()
  const { levelProgress } = level
  const {
    probabilities,
    goal,
    avatars,
    tutorial,
    overrideWeather,
    initialWeather,
    threshold
  } = getLevelData(world, levelNumber, levelSettings)

  const seedType = avatars[0]
  const loadTutorial = tutorial && levelProgress <= levelNumber

  const loadingBackground = loadTutorial
    ? 'blank'
    : Math.random()

  const setUpView = loadTutorial
    ? _dispatch(_.noop)
    : _dispatch(setUpBoard, goal, probabilities)

  const handleWeatherOverride = overrideWeather
    ? _dispatch(_.overrideWeatherPower, true)
    : _dispatch(_.overrideWeatherPower, false)

  const handleInitialWeather = initialWeather && !loadTutorial
    ? _dispatch(_.setRaindropsVisibility, true)
    : _dispatch(_.noop)

  const handleWeatherThreshold = threshold
    ? _dispatch(_.setWeatherThreshold, threshold)
    : _dispatch(_.setWeatherThreshold, 12)

  const view = loadTutorial
    ? 'tutorial'
    : 'level'

  if (levelProgress >= levelNumber) {
    return Promise
      .resolve()
      .then(handleWeatherOverride)
      .then(handleWeatherThreshold)
      .then(_dispatch(_.setSeedType, seedType))
      .then(_dispatch(_.setLoadingBackground, loadingBackground))
      .then(_dispatch(_.showLoadingScreen))
      .delay(500)
      .then(setUpView)
      .then(batch(dispatch, [
        _.setCurrentLevel, levelNumber,
        _.setCurrentWorld, world,
        _.resetScore,
        _.resetWeatherPower, 'sun',
        _.resetWeatherPower, 'rain'
      ]))
      .then(handleInitialWeather)
      .delay(500)
      .then(_dispatch(_.setView, view))
      .delay(1000)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
