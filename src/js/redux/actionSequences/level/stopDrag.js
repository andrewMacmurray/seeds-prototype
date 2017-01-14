import Promise from 'bluebird'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import * as _ from '../../allActions.js'
import triggerWeather from './weather/triggerWeather.js'
import processMove from './processMove.js'
import fallTiles from './fallTiles.js'
import growSeedlings from './growSeedlings.js'
import handleLevelStop from './handleLevelStop.js'
import clearVisibleWeather from './weather/clearVisibleWeather.js'
import { any, equals, gt } from 'ramda'

export default (moveType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const { updating } = state
  const { isDragging, moves: { moveArray } } = state.level

  const isLeaving = any(equals(moveType), [ 'sun', 'rain', 'pod' ])
  const isSeedling = moveType === 'seedling'
  const boardReady = !updating && isDragging
  const falldelay = gt(moveArray.length, 10)
    ? 600
    : 200

  const handleWeatherTrigger = _dispatch(triggerWeather, moveType, seedlingCount)
  const handleReset = _dispatch(fallTiles, moveArray)

  const reset = () => Promise.all([
    handleWeatherTrigger(),
    handleReset()
  ])

  if (boardReady && isLeaving) {
    return Promise
      .resolve()
      .then(_dispatch(processMove, moveType, moveArray))
      .then(_dispatch(clearVisibleWeather))
      .then(_dispatch(_.decrementWeatherTurns))
      .delay(falldelay)
      .then(reset)
      .then(_dispatch(handleLevelStop))
  }

  if (boardReady && isSeedling) {
    return Promise.all([
      dispatch(growSeedlings(moveArray)),
      dispatch(clearVisibleWeather()),
      dispatch(_.decrementWeatherTurns())
    ])
  }
}
