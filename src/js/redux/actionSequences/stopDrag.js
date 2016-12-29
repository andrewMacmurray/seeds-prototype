import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import { identity } from 'ramda'
import triggerWeather from './triggerWeather.js'
import handleLevelStop from './handleLevelStop.js'

export default (moveType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const {
    updating,
    level: {
      isDragging,
      moves: { moveArray }
    }
  } = getState()

  const isWeather =
       moveType === 'rain'
    || moveType === 'sun'

  const isLeaving =
       moveType === 'rain'
    || moveType === 'sun'
    || moveType === 'pod'

  const isSeedling = moveType === 'seedling'
  const boardReady = !updating && isDragging
  const falldelay = moveArray.length > 10
    ? 600
    : 200

  const handleWeather = isWeather
    ? _dispatch(triggerWeather, moveType, seedlingCount)
    : identity

  const handleReset = () => Promise
    .resolve()
    .then(_dispatch(_.fallTiles, moveArray))
    .delay(400)
    .then(batch(dispatch, [
      _.shiftTiles, moveArray,
      _.setEntering,
      identity,
      _.resetMagnitude,
      _.resetLeaving,
      _.resetMoves,
      _.addTiles,
      _.isUpdating, false
    ]))
    .delay(700)
    .then(_dispatch(_.resetEntering))
    .then(_dispatch(handleLevelStop))

  const reset = () => [ handleWeather(), handleReset() ]

  if (boardReady && isLeaving) {
    return Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.addPowerToWeather, moveType,
        _.isUpdating, true,
        _.setLeavingTiles, moveArray
      ]))
      .delay(400)
      .then(_dispatch(_.updateScore, moveType, moveArray))
      .delay(falldelay)
      .then(reset)
      .all()
  }

  if (boardReady && isSeedling) {
    const growDelay = moveArray.length > 10
      ? 1000
      : 800

    return Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.isUpdating, true,
        _.setGrowingSeeds, moveArray
      ]))
      .delay(growDelay)
      .then(_dispatch(_.growSeedsFromMoves, moveArray))
      .delay(growDelay)
      .then(batch(dispatch, [
        _.isUpdating, false,
        _.resetGrowSeeds,
        _.resetMoves
      ]))
  }
}
