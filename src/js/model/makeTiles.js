import { times, map, equals } from 'ramda'
import defaultProbabilities from '../constants/defaultProbabilities.js'

const tileGenerator = (_, prob = defaultProbabilities) => {
  const {
    rain,
    sun,
    seedling,
    pod
  } = prob
  if (rain + sun + seedling + pod > 1) throw new Error('probabilites must add up to 1')

  const rn = Math.random()
  return rn <= rain
      ? 1
    : rn > rain && rn <= rain + sun
      ? 2
    : rn > rain + sun && rn <= rain + sun + seedling
      ? 3
    : rn > rain + sun + seedling && rn <= rain + sun + seedling + pod
      ? 4
    : 1
}

const makeRow = (prob) => times(() => tileGenerator('', prob), 8)
export const randomBoard = (prob) => times(() => makeRow(prob), 8)

const addRandomTile = (x, prob) => equals(0, x) ? tileGenerator(prob) : x
const addNewRow = map(addRandomTile)

// replaces zero (leaving) tiles with new random tiles
export const addNewTiles = map(addNewRow)
