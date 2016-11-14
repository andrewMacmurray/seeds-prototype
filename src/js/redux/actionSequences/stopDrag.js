import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default (moveType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { updating, isDragging, weather: { rain, sun }, moves: { moveArray } } = getState()

  if (!updating && isDragging) {

    if (rain > 12 || sun > 12) {
      Promise
        .resolve()
        .then(_dispatch(_.resetWeather, moveType))
        .delay(800)
        .then(_dispatch(_.growSeeds, seedlingCount))
        .delay(500)
        .then(_dispatch(_.growSeedsOnBoard))
        .delay(1200)
        .then(_dispatch(_.resetGrowSeeds))
    }

    return Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.updateScore, moveType, moveArray,
        _.isUpdating, true,
        _.setLeavingTiles, moveArray
      ]))
      .delay(300)
      .then(_dispatch(_.fallTiles, moveArray))
      .delay(300)
      .then(batch(dispatch, [
        _.shiftTiles, moveArray,
        _.setEntering,
        _.resetMagnitude,
        _.resetLeaving,
        _.resetMoves
      ]))
      .delay(200)
      .then(_dispatch(_.addTiles))
      .delay(300)
      .then(_dispatch(_.isUpdating, false))
      .delay(700)
      .then(_dispatch(_.resetEntering))
  }
}
