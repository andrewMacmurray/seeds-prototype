import * as _ from '../allActions.js'

export default (tile, moveType) => (dsp, getState) => {
  const { isDragging, updating } = getState()
  if (isDragging && !updating) {
    dsp(_.checkTile(tile))
    dsp(_.addPowerToWeather(moveType))
  }
}
