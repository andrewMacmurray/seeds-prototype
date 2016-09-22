import { map } from 'ramda'

const removeSeed = (x) => x === 3 || x === 4 ? 0 : x
export const seedsRow = map(removeSeed)
export const removeSeedsFromBoard = map(seedsRow)

// converts zero tiles to an array of booleans (true if leaving, false if staying)
export const booleanArray = map(map(x => x === 0))
