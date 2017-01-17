import Promise from 'bluebird'
import * as _ from '../../../allActions.js'
import { makeLazyDispatcher } from '../../../_thunkHelpers.js'

export default (moveType) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  if (moveType === 'rain') {
    return Promise
      .resolve()
      .then(_dispatch(_.setRaindropsVisibility, true))
      .then(_dispatch(_.setSunSphereVisibility, false))

  } else if (moveType === 'sun') {
    return Promise
      .resolve()
      .then(_dispatch(_.setSunSphereVisibility, true))
      .then(_dispatch(_.setRaindropsVisibility, false))

  } else {
    return dispatch(_.noop)
  }
}
