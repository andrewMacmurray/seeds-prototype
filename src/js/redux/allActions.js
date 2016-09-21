import * as board from './modules/board.js'
import * as fallingMagnitude from './modules/fallingMagnitude.js'
import * as growingMoves from './modules/growingMoves.js'
import * as isEntering from './modules/isEntering.js'
import * as isLeaving from './modules/isLeaving.js'
import * as isUpdating from './modules/isUpdating.js'
import * as moves from './modules/moves.js'

export default {
  ...board,
  ...fallingMagnitude,
  ...growingMoves,
  ...isEntering,
  ...isLeaving,
  ...isUpdating,
  ...moves
}
