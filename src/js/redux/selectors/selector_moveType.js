import { createSelector } from 'reselect'
import tileClassMap from '../../constants/tileClasses.js'

const _board = state => state.board
const _moveArray = state => state.moves.moveArray

module.exports = createSelector(
  [ _board, _moveArray ],
  (board, moveArray) => {
    const tileNumber = moveArray.length ? board[moveArray[0][0]][moveArray[0][1]] : -1
    return tileClassMap[tileNumber]
  }
)
