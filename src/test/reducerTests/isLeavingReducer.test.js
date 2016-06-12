import tape from 'tape'
import leavingReducer from '../../js/reducers/reducer_isLeaving.js'
import { STOP_DRAG, RESET_LEAVING } from '../../js/actions/actionTypes.js'

import { board, sampleMove1, sampleLeaving1 } from '../testHelpers.js'
import { falseBoard } from '../../js/model/model.js'
const defaultLeaving = falseBoard()

tape('leavingReducer should return default state with unrecoginised action', (t) => {

  const actual = leavingReducer(defaultLeaving, { type: 'OTHER_ACTION', payload: { board, moves: sampleMove1 } })
  const expected = defaultLeaving

  t.deepEqual(actual, expected, 'state returned correctly')
  t.end()

})

tape('leavingReducer should map the tiles about to leave the board correctly', (t) => {

  const action = { type: STOP_DRAG, payload: { board, moves: sampleMove1 } }
  const actual = leavingReducer(defaultLeaving, action)
  const expected = sampleLeaving1

  t.deepEqual(actual, expected, 'leaving state returned correctly')
  t.end()

})

tape('leavingReducer is able to be reset the state to a false board', (t) => {

  const action = { type: RESET_LEAVING, payload: null }
  const actual = leavingReducer(sampleLeaving1, action)
  const expected = defaultLeaving

  t.deepEqual(actual, expected, 'leaving board has been correctly reset')
  t.end()

})
