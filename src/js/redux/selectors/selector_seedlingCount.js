import { createSelector } from 'reselect'
import { countSeedlings } from '../../model/index.js'

const _board = state => state.board

module.exports = createSelector([ _board ], countSeedlings)
