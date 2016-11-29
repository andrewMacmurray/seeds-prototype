import * as _ from '../allActions.js'

export default (tile) => (dispatch, getState) => {
  const { level: { isDragging }, updating } = getState()

  if (isDragging && !updating) {
    dispatch(_.checkTile(tile))
  }
}
