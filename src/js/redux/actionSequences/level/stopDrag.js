import Promise from 'bluebird'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import triggerWeather from './triggerWeather.js'
import processMove from './processMove.js'
import fallTiles from './fallTiles.js'
import growSeedlings from './growSeedlings.js'
import handleLevelStop from './handleLevelStop.js'
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

  const handleWeather = _dispatch(triggerWeather, moveType, seedlingCount)
  const handleReset = _dispatch(fallTiles, moveArray)

  const reset = () => Promise.all([
    handleWeather(),
    handleReset()
  ])

  if (boardReady && isLeaving) {
    return Promise
      .resolve()
      .then(_dispatch(processMove, moveType, moveArray))
      .delay(falldelay)
      .then(reset)
      .then(_dispatch(handleLevelStop))
  }

  if (boardReady && isSeedling) {
    return dispatch(growSeedlings(moveArray))
  }
}
