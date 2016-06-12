import tape from 'tape'
import magnitudeReducer from '../../js/reducers/reducer_fallingMagnitude.js'
import { STOP_DRAG } from '../../js/actions/actionTypes.js'

import { falseBoard } from '../../js/model/model.js'
import { board, magnitude2, sampleMove2 } from '../testHelpers.js'

tape('magnitudeReducer should return default state for unreconised action', (t) => {

  const action = { type: 'UNKONWN' }
  const state = falseBoard()

  const actual = magnitudeReducer(state, action)
  const expected = state

  t.deepEqual(actual, expected, 'default state returned')
  t.end()

})

tape('magnitudeReducer should map the falling magnitude of the remaining tiles correctly', (t) => {

  const action = { type: STOP_DRAG,
    payload: { board, moves: sampleMove2 }
  }
  const state = falseBoard()

  const actual = magnitudeReducer(state, action)
  const expected = magnitude2

  t.deepEqual(actual, expected, 'magnitude mapped correctly')
  t.end()

})
