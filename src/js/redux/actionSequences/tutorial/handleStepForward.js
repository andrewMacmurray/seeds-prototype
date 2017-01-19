import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import setTutorialBoard from './setTutorialBoard.js'
import handleWeather from './handleWeather.js'
import stepForwardData from './stepForwardData.js'
import startLevel from './startLevel.js'

const handleStepForward = () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const {
    substep,
    board,
    total,
    lastStep,
    step,
    autoUntil,
    weather,
    delay,
    currentSubstep
  } = stepForwardData(state)

  const handleBoard = board && board.substep === substep
    ? _dispatch(setTutorialBoard, board)
    : _dispatch(_.noop)

  const handleWeatherAndBoard = () =>
    Promise
      .resolve()
      .then(handleBoard)
      .then(_dispatch(handleWeather, weather))

  if (step === lastStep && substep === total) {
    return dispatch(startLevel())
  }

  if (substep < autoUntil) {
    return Promise
      .resolve()
      .then(_dispatch(_.setTutorialUpdating, true))
      .then(handleWeatherAndBoard)
      .then(_dispatch(_.incrementTutorialSubStep))
      .delay(delay)
      .then(_dispatch(handleStepForward))

  }

  if (currentSubstep === total) {
    return Promise
      .resolve()
      .then(_dispatch(_.setTutorialUpdating, true))
      .then(handleWeatherAndBoard)
      .then(_dispatch(_.resetTutorialSubStep))
      .then(_dispatch(_.incrementTutorialStep))
      .delay(delay)
      .then(_dispatch(handleStepForward))

  }

  return Promise
    .resolve()
    .then(handleWeatherAndBoard)
    .then(_dispatch(handleWeather, weather))
    .then(_dispatch(_.incrementTutorialSubStep))
    .then(_dispatch(_.setTutorialUpdating, false))
}

export default handleStepForward
