import * as _ from '../allActions.js'
import { wait } from '../helpers'

export default (moveType) => (dsp, getState) => {
  const { updating, isDragging, weather: { rain, sun } } = getState()

  if (!updating && isDragging) {
    if (rain >= 12 || sun >= 12) {
      dsp(_.resetWeather(moveType))
      wait(700)
      .then(() => dsp(_.growSeeds()))
      .then(() => wait(500))
      .then(() => dsp(_.transformBoard(4)))
    }

    dsp(_.setDrag(false))
    dsp(_.updateScore(moveType))
    dsp(_.isUpdating(true))
    dsp(_.setLeavingTiles())

    wait(300)
      .then(() => dsp(_.fallTiles()))
      .then(() => wait(300))
      .then(() => {
        dsp(_.isUpdating(false))
        return [
          _.shiftTiles(),
          _.setEntering(),
          _.resetMagnitude(),
          _.resetLeaving(),
          _.resetMoves()
        ].map(dsp)
      })
      .then(() => wait(200))
      .then(() => dsp(_.addTiles()))
      .then(() => wait(700))
      .then(() => dsp(_.resetGrowSeeds()))
      .then(() => wait(300))
      .then(() => dsp(_.resetEntering()))
  }
}
