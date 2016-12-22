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
    ? 1000
    : 600

  const handleWeather = isWeather
    ? _dispatch(triggerWeather, moveType, seedlingCount)
    : identity

  if (boardReady && isLeaving) {
    Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.addPowerToWeather, moveType,
        _.updateScore, moveType, moveArray,
        _.isUpdating, true,
        _.setLeavingTiles, moveArray
      ]))
      .delay(falldelay)
      .then(handleWeather)
      .then(_dispatch(_.fallTiles, moveArray))
      .delay(400)
      .then(batch(dispatch, [
        _.shiftTiles, moveArray,
        _.setEntering,
        _.resetMagnitude,
        _.resetLeaving,
        _.resetMoves,
        _.addTiles,
        _.isUpdating, false
      ]))
      .delay(700)
      .then(_dispatch(_.resetEntering))
      .then(_dispatch(handleLevelStop))
  }

  if (boardReady && isSeedling) {
    const growDelay = moveArray.length > 10
      ? 1000
      : 800
    Promise
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
