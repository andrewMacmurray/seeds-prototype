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
  return n <= rain
      ? 1
    : n > rain && n <= rain + sun
      ? 2
    : n > rain + sun && n <= rain + sun + seedling
      ? 3
    : n > rain + sun + seedling
      ? 4
    : 1
}

const makeRow = (n, prob) => times(() => tileGenerator('', prob), n)
export const randomBoard = (n, prob) => times(() => makeRow(n, prob), n)

const addRandomTile = (x, prob) => equals(0, x) ? tileGenerator('', prob) : x
const repopulateRow = (row, prob) => map((x) => addRandomTile(x, prob))(row)

// replaces zero (leaving) tiles with new random tiles
export const addNewTiles = (board, prob) => map((x) => repopulateRow(x, prob))(board)
