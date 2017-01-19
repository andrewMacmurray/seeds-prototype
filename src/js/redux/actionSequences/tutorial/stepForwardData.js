import { drop } from 'ramda'
import { lastAuto, getTutorialData } from '../dataHelpers/tutorialDataHelpers.js'

export default (state) => {
  const {
    substep: currentSubstep,
    data,
    step
  } = state.tutorial
  const { substeps, board, weather } = getTutorialData(step, data)
  const total = substeps.length
  const nextSubsteps = drop(currentSubstep, substeps)
  const autoUntil = lastAuto(nextSubsteps)
  const { delay, substep } = substeps[currentSubstep - 1]
  const lastStep = data.length

  return {
    total,
    board,
    weather,
    currentSubstep,
    step,
    data,
    autoUntil,
    delay,
    substep,
    lastStep
  }
}
