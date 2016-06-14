import tape from 'tape'
import boardReducer from '../../js/reducers/reducer_board.js'
import { SHIFT_TILES, ADD_TILES } from '../../js/actions/actionTypes.js'

import { board, leaving2, sampleMove2, shiftedBoard } from '../testHelpers.js'

tape('boardReducer should return default state for unrecognized action', (t) => {

  const action = { type: 'UNKOWN' }
  const state = board

  const actual = boardReducer(state, action)
  const expected = state

  t.deepEqual(actual, expected, 'default state returned')
  t.end()

})

tape('boardReducer should shift tiles correctly after valid move', (t) => {

  const action = { type: SHIFT_TILES, payload: { board, moves: sampleMove2 } }
  const state = board

  const actual = boardReducer(state, action)
  const expected = shiftedBoard

  t.deepEqual(actual, expected, 'board has shifted correctly')
  t.end()

})

tape('boardReducer adds new tiles above the shifted tiles', (t) => {

  const action = { type: ADD_TILES,
    payload: board
  }
  const state = shiftedBoard

  const actual = boardReducer(state, action)
  t.ok(actual[6][1] !== 0, 'empty tile has correctly been replaced with a number')
  t.ok(actual[6][2] !== 0, 'empty tile has correctly been replaced with a number')
  t.ok(actual[5][2] !== 0, 'empty tile has correctly been replaced with a number')
  t.ok(actual[4][3] !== 0, 'empty tile has correctly been replaced with a number')
  t.end()

})
