import { times, map, equals } from 'ramda'
import { even } from '../constants/probabilities.js'

const tileGenerator = (_, prob = even) => {
  const {
    rain,
    sun,
    seedling,
    pod
  } = prob
  if (rain + sun + seedling + pod > 1) throw new Error('probabilites must add up to 1')

  const n = Math.random()
  return n <= sun
      ? 1
    : n > sun && n <= sun + rain
      ? 2
    : n > sun + rain && n <= sun + rain + seedling
      ? 3
    : n > sun + rain + seedling
      ? 4
    : 1
}

const makeRow = (n, prob) => times(() => tileGenerator('', prob), n)
export const randomBoard = (n, prob) => times(() => makeRow(n, prob), n)

const addRandomTile = (x, prob) => equals(0, x) ? tileGenerator('', prob) : x
const repopulateRow = (row, prob) => map((x) => addRandomTile(x, prob))(row)

// replaces zero (leaving) tiles with new random tiles
export const addNewTiles = (board, prob) => map((x) => repopulateRow(x, prob))(board)
