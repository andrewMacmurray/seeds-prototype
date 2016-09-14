import tape from 'tape'
import { growingMoveArray, isGrowingArray } from '../../js/model/growSeeds.js'
import { board, sampleMove1 } from '../testHelpers.js'

tape('growingMoveArray function converts random 3s to an array of moves', (t) => {
  const actual = growingMoveArray(board)

  t.ok(actual.length > 0, 'makes an array')
  t.ok(actual[0].length === 2, 'makes a nested array of coordinates')

  t.end()
})

tape('isGrowingArray function converts an array of moves to a boolean board', (t) => {

  const actual = isGrowingArray(sampleMove1, board)
  t.equals(actual[0][0], true, 'returns correct array')
  t.equals(actual[0][1], false, 'returns correct array')
  t.equals(actual[1][0], true, 'returns correct array')
  t.equals(actual[7][7], false, 'returns correct array')

  t.end()
})
