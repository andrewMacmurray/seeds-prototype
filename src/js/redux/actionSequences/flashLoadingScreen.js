import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher } from '../_thunkHelpers.js'

export default (background, delay = 3000) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(_dispatch(_.setLoadingBackground, background))
    .then(_dispatch(_.showLoadingScreen))
    .delay(delay)
    .then(_dispatch(_.hideLoadingScreen))
}
