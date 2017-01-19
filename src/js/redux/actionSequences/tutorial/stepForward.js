import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import { getTutorialData, lastAuto } from '../dataHelpers/tutorialDataHelpers.js'
import setTutorialBoard from './setTutorialBoard.js'
// import loadLevelData from './loadLevelData.js'
import handleWeather from './handleWeather.js'
import { drop } from 'ramda'

const auto = () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const {
    substep: currentSubstep,
    data,
    step
  } = state.tutorial
  const tutData = getTutorialData(step, data)
  const { substeps, board, weather } = tutData
  const total = substeps.length
  const nextSubsteps = drop(currentSubstep, substeps)
  const autoUntil = lastAuto(nextSubsteps)
  const { delay, substep } = substeps[currentSubstep - 1]

  const handleBoard = board && board.substep === substep
    ? _dispatch(setTutorialBoard, board)
    : _dispatch(_.noop)

  if (substep < autoUntil) {
    // console.log('auto')
    return Promise
      .resolve()
      .then(handleBoard)
      .then(_dispatch(_.incrementTutorialSubStep))
      .delay(delay)
      .then(_dispatch(auto))

  } else if (currentSubstep === total) {
    // console.log('next')
    return Promise
      .resolve()
      .then(handleBoard)
      .then(_dispatch(_.resetTutorialSubStep))
      .then(_dispatch(_.incrementTutorialStep))
      .delay(delay)
      .then(_dispatch(auto))

  } else {
    // console.log('once')
    return Promise
      .resolve()
      .then(_dispatch(_.incrementTutorialSubStep))
  }
}

export default auto
