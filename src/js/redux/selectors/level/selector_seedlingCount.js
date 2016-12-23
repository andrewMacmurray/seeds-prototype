import { createSelector } from 'reselect'
import { countSeedlings } from '../../../model/index.js'
import { _board } from '../baseSelectors.js'

module.exports = createSelector([ _board ], countSeedlings)
