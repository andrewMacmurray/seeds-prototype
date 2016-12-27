import { createSelector } from 'reselect'
import { _board } from '../baseSelectors.js'
import { equals, compose, flatten, length, filter, gt, __ } from 'ramda'

const count4s = compose(
  length,
  filter(equals(4)),
  flatten
)

const boardComplete = compose(
  gt(__, 3),
  count4s
)

const tutorialBoardComplete = createSelector([ _board ], boardComplete)

export default tutorialBoardComplete
