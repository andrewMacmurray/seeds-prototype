import Promise from 'bluebird'
import * as _ from '../../allActions.js'
import { batch, makeLazyDispatcher } from '../../_thunkHelpers.js'

export default (moveType, moveArray) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

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
}
