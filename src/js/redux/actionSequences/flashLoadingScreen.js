import Promise from 'extends-promise'
import * as _ from '../allActions.js'
import { makeLazyDispatcher } from '../_thunkHelpers.js'

export default (background) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  Promise
    .resolve()
    .then(_dispatch(_.showLoadingScreen, background))
    .delay(3000)
    .then(_dispatch(_.hideLoadingScreen))
}
