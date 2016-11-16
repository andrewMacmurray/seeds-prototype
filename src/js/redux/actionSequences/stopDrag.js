import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default (moveType) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { updating, isDragging, moves: { moveArray } } = getState()

  if (!updating && isDragging) {
    Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.addPowerToWeather, moveType,
        _.updateScore, moveType, moveArray,
        _.isUpdating, true,
        _.setLeavingTiles, moveArray
      ]))
      .delay(300)
      .then(_dispatch(_.fallTiles, moveArray))
      .delay(600)
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
