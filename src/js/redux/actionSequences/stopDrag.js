import * as _ from '../allActions.js'
import { wait } from '../helpers'

export default (moveType) => (dispatch, getState) => {
  const { updating, isDragging, weather: { rain, sun } } = getState()

  if (!updating && isDragging) {
    if (rain >= 12 || sun >= 12) {
      dispatch(_.resetWeather(moveType))
      wait(700)
      .then(() => dispatch(_.growSeeds()))
      .then(() => wait(500))
      .then(() => dispatch(_.transformBoard(4)))
    }

    dispatch(_.setDrag(false))
    dispatch(_.updateScore(moveType))
    dispatch(_.isUpdating(true))
    dispatch(_.setLeavingTiles())

    wait(300)
      .then(() => dispatch(_.fallTiles()))
      .then(() => wait(300))
      .then(() => {
        dispatch(_.isUpdating(false))
        return [
          _.shiftTiles(),
          _.setEntering(),
          _.resetMagnitude(),
          _.resetLeaving(),
          _.resetMoves()
        ].map(dispatch)
      })
      .then(() => wait(200))
      .then(() => dispatch(_.addTiles()))
      .then(() => wait(700))
      .then(() => dispatch(_.resetGrowSeeds()))
      .then(() => wait(300))
      .then(() => dispatch(_.resetEntering()))
  }
}
