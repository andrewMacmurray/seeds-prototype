import * as constants from './constants.js'
import * as fallTiles from './fallTiles.js'
import * as growSeeds from './growSeeds.js'
import * as makeTiles from './makeTiles.js'
import * as removeTiles from './removeTiles.js'
import * as shiftTiles from './shiftTiles.js'
import * as transformTiles from './transformTiles.js'
import * as validMove from './validMove.js'

module.exports = {
  ...constants,
  ...fallTiles,
  ...growSeeds,
  ...makeTiles,
  ...removeTiles,
  ...shiftTiles,
  ...transformTiles,
  ...validMove
}
