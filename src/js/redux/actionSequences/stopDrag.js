import * as _ from '../allActions.js'
import Promise from 'extends-promise'
import { makeLazyDispatcher, batch } from '../helpers.js'

export default (moveType) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { updating, isDragging, weather: { rain, sun } } = getState()

  if (!updating && isDragging) {
    if (rain >= 12 || sun >= 12) {
      dispatch(_.resetWeather(moveType))
      Promise
        .delay(700)
        .then(_dispatch(_.growSeeds))
        .delay(500)
        .then(_dispatch(_.transformBoard, 4))
    }

    dispatch(_.setDrag(false))
    dispatch(_.updateScore(moveType))
    dispatch(_.isUpdating(true))
    dispatch(_.setLeavingTiles())

    const update = batch(dispatch,
      [ _.isUpdating, false,
        _.shiftTiles,
        _.setEntering,
        _.resetMagnitude,
        _.resetLeaving,
        _.resetMoves
      ]
    )

    Promise
      .delay(300)
      .then(_dispatch(_.fallTiles))
      .delay(300)
      .then(update)
      .delay(200)
      .then(_dispatch(_.addTiles))
      .delay(700)
      .then(_dispatch(_.resetGrowSeeds))
      .delay(300)
      .then(_dispatch(_.resetEntering))
  }
}
