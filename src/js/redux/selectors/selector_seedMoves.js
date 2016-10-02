import { createSelector } from 'reselect'
import { getSeedMoves } from '../../model'

const _board = (state) => state.board

module.exports = createSelector([ _board ], getSeedMoves)
