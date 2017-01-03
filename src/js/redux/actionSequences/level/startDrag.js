import * as _ from '../../allActions.js'

export default ([ x, y ]) => (dispatch, getState) => {
  const { updating } = getState()

  if (!updating) {
    dispatch(_.setDrag(true))
    dispatch(_.checkTile([ x, y ]))
  }
}
