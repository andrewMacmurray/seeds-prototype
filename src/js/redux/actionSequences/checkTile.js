import * as _ from '../allActions.js'

export default (tile, moveType) => (dispatch, getState) => {
  const { isDragging, updating } = getState()
  if (isDragging && !updating) {
    dispatch(_.checkTile(tile))
    dispatch(_.addPowerToWeather(moveType))
  }
}
