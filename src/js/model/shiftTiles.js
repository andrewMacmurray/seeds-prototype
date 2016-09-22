import { equals, filter, concat, map } from 'ramda'

const isZero = equals(0)
const isTile = (tile) => tile !== 0
const filterZeroes = filter(isZero)
const filterTiles = filter(isTile)

export const shift = (board) => concat(filterZeroes(board), filterTiles(board))

// shift zero tiles to the top of the array
export const shiftBoard = map(shift)
