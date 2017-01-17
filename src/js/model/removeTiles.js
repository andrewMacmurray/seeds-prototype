import { map } from 'ramda'
import { markTileOnBoard } from './utils.js'

const removeSeed = (x) => x === 3 || x === 4 ? 0 : x
export const seedsRow = map(removeSeed)
export const removeSeedsFromBoard = map(seedsRow)

// converts zero tiles to an array of booleans (true if leaving, false if staying)
export const markZeroes = markTileOnBoard(0)
