import { compose, times, map, equals } from 'ramda'

const multiply = (x) => x * 3 + 1
const roundRandom = compose(Math.round, multiply, Math.random)
const makeRow = () => times(roundRandom, 8)
export const randomBoard = () => times(makeRow, 8)

const addRandomTile = (x) => equals(0, x) ? roundRandom() : x
const addNewRow = map(addRandomTile)

// replaces zero (leaving) tiles with new random tiles
export const addNewTiles = map(addNewRow)
