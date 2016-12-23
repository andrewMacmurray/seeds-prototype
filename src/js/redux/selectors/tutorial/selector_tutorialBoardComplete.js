import { createSelector } from 'reselect'
import { _board } from '../baseSelectors.js'
import { equals, contains, anyPass } from 'ramda'

const fullSeeds = equals([[ 4, 4 ], [ 4, 4 ]])
const halfSeeds = contains([ 4, 4 ])
const halfSeeds2 = equals([[ 4, 3 ], [ 4, 3 ]])
const halfSeeds3 = equals([[ 3, 4 ], [ 3, 4 ]])

const boardComplete = anyPass([
  fullSeeds,
  halfSeeds,
  halfSeeds2,
  halfSeeds3
])

const tutorialBoardComplete = createSelector([ _board ], boardComplete)

export default tutorialBoardComplete
