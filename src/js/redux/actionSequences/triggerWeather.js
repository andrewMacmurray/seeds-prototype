import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher } from '../_thunkHelpers.js'

export default (weatherType, seedlingCount) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { weather: { rain, sun } } = getState()

  if (rain > 12 || sun > 12) {
    Promise
      .resolve()
      .then(_dispatch(_.resetWeather, weatherType))
      .delay(1000)
      .then(_dispatch(_.growSeeds, seedlingCount))
      .delay(500)
      .then(_dispatch(_.growSeedsOnBoard))
      .delay(500)
      .then(_dispatch(_.resetGrowSeeds))
  }
}
