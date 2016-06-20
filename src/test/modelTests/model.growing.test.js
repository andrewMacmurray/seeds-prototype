import tape from 'tape'
import { growingMoveArray } from '../../js/model/growSeeds.js'
import { board } from '../testHelpers.js'

tape('growingMoveArray function converts random 3s to an array of moves', (t) => {
  const actual = growingMoveArray(board)

  t.ok(actual.length > 0, 'makes an array')
  t.ok(actual[0].length === 2, 'makes a nested array of coordinates')

  t.end()
})
