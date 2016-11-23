import { createSelector } from 'reselect'
import { getSeedMoves } from '../../model'
import { _board } from './baseSelectors.js'

module.exports = createSelector([ _board ], getSeedMoves)
