import * as _ from '../../allActions.js'
import { makeLazyDispatcher, batch } from '../../_thunkHelpers.js'
import Promise from 'bluebird'
import { contains, identity } from 'ramda'
import { getTutorialData, getLevelData } from './_helpers.js'

const autoAt = () => (dispatch, getState, levelSettings) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const { subStep, data, step } = state.tutorial
  const { total, autoSteps, board } = getTutorialData(step, data)
  const shouldAutoIncrement = contains(subStep, autoSteps)
  const lastStep = data.length

  const handleBoard = board && board.step === subStep
    ? Promise
        .resolve()
        .then(batch(dispatch, [
          _.setProbabilities, board.probabilities,
          _.setBoardSize, board.size
        ]))
    : identity

  if (step === lastStep && subStep === total) {
    const { level, world } = state.level.currentLevel
    const { goal, probabilities } = getLevelData(world, level, levelSettings)

    return Promise
      .resolve()
      .then(_dispatch(_.showLoadingScreen))
      .then(_dispatch(_.setLevelGoal, goal))
      .then(_dispatch(_.setProbabilities, probabilities))
      .then(_dispatch(_.setBoardSize, 8))
      .then(_dispatch(_.resetScore))
      .then(_dispatch(_.resetWeatherPower, 'rain'))
      .then(_dispatch(_.resetWeatherPower, 'sun'))
      .delay(2500)
      .then(_dispatch(_.hideLoadingScreen))
      .then(_dispatch(_.setView, 'level'))
  }

  if (total > 0) {
    if (shouldAutoIncrement) {
      return Promise
        .resolve()
        .then(_dispatch(_.setTutorialUpdating, true))
        .then(_dispatch(_.incrementTutorialSubStep))
        .delay(1000)
        .then(_dispatch(autoAt))

    } else if (subStep === total) {
      return Promise
        .resolve()
        .then(handleBoard)
        .then(_dispatch(_.resetTutorialSubStep))
        .then(_dispatch(_.incrementTutorialStep))
        .delay(1000)
        .then(_dispatch(autoAt))

    } else {
      return Promise
        .resolve()
        .then(_dispatch(_.incrementTutorialSubStep))
        .then(_dispatch(_.setTutorialUpdating, false))
    }
  }

}

export default autoAt
