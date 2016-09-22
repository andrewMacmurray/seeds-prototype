import * as _ from '../allActions.js'

export default (tile, moveType) => (dsp, getState) => {
  const { updating } = getState()
  if (!updating) {
    dsp(_.setDrag(true))
    dsp(_.checkTile(tile))
    dsp(_.addPowerToWeather(moveType))
  }
}
