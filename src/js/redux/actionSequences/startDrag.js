import * as _ from '../allActions.js'
import tileClassMap from '../../constants/tileClasses.js'

export default ([ x, y ]) => (dispatch, getState) => {
  const { updating, board } = getState()
  const tileType = tileClassMap[board[x][y]]

  if (!updating) {
    dispatch(_.setDrag(true))
    dispatch(_.checkTile([ x, y ]))
    dispatch(_.addPowerToWeather(tileType))
  }
}
