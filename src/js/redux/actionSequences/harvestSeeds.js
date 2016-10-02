import Promise from 'bluebird'
import { makeLazyDispatcher, batch } from '../_helpers.js'
import * as _ from '../allActions.js'

export default (seedMoves) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(_dispatch(_.setLeavingTiles, seedMoves))
    .delay(300)
    .then(_dispatch(_.fallTiles, seedMoves))
    .delay(300)
    .then(batch(dispatch, [
      _.shiftTiles, seedMoves,
      _.setEntering,
      _.resetMagnitude,
      _.resetLeaving
    ]))
    .delay(200)
    .then(_dispatch(_.addTiles))
    .delay(700)
    .then(_dispatch(_.resetEntering))
}
