import * as board from './modules/board.js'
import * as fallingMagnitude from './modules/fallingMagnitude.js'
import * as growingMoves from './modules/growingMoves.js'
import * as isEntering from './modules/isEntering.js'
import * as isLeaving from './modules/isLeaving.js'
import * as isUpdating from './modules/isUpdating.js'
import * as moves from './modules/moves.js'
import * as score from './modules/score.js'
import * as setDrag from './modules/setDrag.js'
import * as weatherPower from './modules/weatherPower.js'
import * as view from './modules/view.js'
import * as text from './modules/text.js'
import * as loading from './modules/loadingScreen.js'

module.exports = {
  ...text,
  ...board,
  ...fallingMagnitude,
  ...growingMoves,
  ...isEntering,
  ...isLeaving,
  ...isUpdating,
  ...moves,
  ...score,
  ...setDrag,
  ...weatherPower,
  ...view,
  ...loading
}
