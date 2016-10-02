import * as _ from '../allActions.js'
import Promise from 'extends-promise'
import { makeLazyDispatcher, batch } from '../_helpers.js'

export default (moveType) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { updating, isDragging, weather: { rain, sun }, moves: { moveArray } } = getState()

  if (!updating && isDragging) {

    if (moveArray.length === 1) {
      return Promise
        .resolve()
        .then(_dispatch(_.setDrag, false))
        .then(_dispatch(_.resetMoves))
    }

    if (rain > 12 || sun > 12) {
      Promise
        .resolve()
        .then(_dispatch(_.resetWeather, moveType))
        .delay(700)
        .then(_dispatch(_.growSeeds))
        .delay(500)
        .then(_dispatch(_.growSeedsOnBoard))
    }

    return Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.updateScore, { args: [ moveType, moveArray ] },
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
      .then(_dispatch(_.isUpdating, false))
      .delay(700)
      .then(_dispatch(_.resetGrowSeeds))
      .delay(300)
      .then(_dispatch(_.resetEntering))
  }
}
