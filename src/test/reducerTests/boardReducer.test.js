import tape from 'tape'
import boardReducer from '../../js/reducers/reducer_board.js'
import { board } from '../testHelpers.js'

tape('boardReducer should return default state for unrecognized action', (t) => {

  const action = { type: 'UNKOWN' }
  const state = board

  const actual = boardReducer(state, action)
  const expected = state

  t.deepEqual(actual, expected, 'default state returned')
  t.end()

})

// tape('boardReducer should shift tiles correctly after valid move', (t) => {
//
// })
