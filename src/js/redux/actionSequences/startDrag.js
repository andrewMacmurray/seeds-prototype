import * as _ from '../allActions.js'

export default (tile, moveType) => (dispatch, getState) => {
  const { updating } = getState()
  if (!updating) {
    dispatch(_.setDrag(true))
    dispatch(_.checkTile(tile))
    dispatch(_.addPowerToWeather(moveType))
  }
}
