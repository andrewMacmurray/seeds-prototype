import { createSelector } from 'reselect'
import { _board } from '../baseSelectors.js'
import { equals, compose, flatten, length, filter, gte, __ } from 'ramda'

const countTiles = (n) => compose(
  length,
  filter(equals(n)),
  flatten
)

const totalTiles = compose(length, flatten)
const seedPercentage = (board) => countTiles(4)(board) / totalTiles(board)
const seedPodPercentage = (board) => countTiles(3)(board) / totalTiles(board)

const seedPodBoardPercent = compose(
  gte(__, 0.75),
  seedPercentage
)

const seedBoardPercent = compose(
  gte(__, 0.75),
  seedPodPercentage
)

export const seedPodBoardComplete = createSelector([ _board ], seedPodBoardPercent)
export const seedBoardComplete = createSelector([ _board ], seedBoardPercent)
