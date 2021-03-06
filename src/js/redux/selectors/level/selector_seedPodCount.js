import { createSelector } from 'reselect'
import { countSeedPods } from '../../../model/index.js'
import { _board } from '../baseSelectors.js'

module.exports = createSelector([ _board ], countSeedPods)
