import { createSelector } from 'reselect'
import tileClassMap from '../../../constants/tileClasses.js'
import { _moveArray, _board } from '../baseSelectors.js'

module.exports = createSelector(
  [ _board, _moveArray ],
  (board, moveArray) => {
    const tileNumber = moveArray.length ? board[moveArray[0][0]][moveArray[0][1]] : -1
    return tileClassMap[tileNumber]
  }
)
