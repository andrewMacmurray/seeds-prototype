import { createSelector } from 'reselect'
import { _board } from '../baseSelectors.js'
import { equals, compose, flatten, length, filter, gte, __ } from 'ramda'

const countTiles = (n) => compose(
  length,
  filter(equals(n)),
  flatten
)

const totalTiles = compose(length, flatten)
const podPercentage = (board) => countTiles(4)(board) / totalTiles(board)
const seedlingPercentage = (board) => countTiles(3)(board) / totalTiles(board)

const seedlingBoardPercent = compose(
  gte(__, 0.9),
  podPercentage
)

const podBoardPercent = compose(
  gte(__, 0.9),
  seedlingPercentage
)

export const seedlingBoardComplete = createSelector([ _board ], seedlingBoardPercent)
export const podBoardComplete = createSelector([ _board ], podBoardPercent)
