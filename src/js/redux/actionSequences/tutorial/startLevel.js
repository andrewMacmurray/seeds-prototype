import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import { getLevelData } from '../dataHelpers/levelDataHelpers.js'
import loadLevelData from './loadLevelData.js'

export default () => (dispatch, getState, levelSettings) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()

  const { world, level } = state.level.currentLevel
  const {
    goal,
    probabilities,
    initialWeather,
    threshold
  } = getLevelData(world, level, levelSettings)

  const handleInitialWeather = initialWeather === 'rain'
    ? _dispatch(_.setRaindropsVisibility, true)
    : _dispatch(_.noop)

  const handleWeatherThreshold = threshold
    ? _dispatch(_.setWeatherThreshold, threshold)
    : _dispatch(_.setWeatherThreshold, 12)

  return Promise
    .resolve()
    .then(_dispatch(loadLevelData, goal, probabilities))
    .then(handleInitialWeather)
    .then(handleWeatherThreshold)
    .then(_dispatch(_.setTutorialUpdating, false))
}
