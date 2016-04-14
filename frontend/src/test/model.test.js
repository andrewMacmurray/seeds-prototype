import tape from 'tape'
import { validMove } from '../js/helpers/model.js'

const board = [
  [2, 3, 3, 1, 2, 0, 0, 1],
  [2, 0, 2, 3, 2, 0, 1, 1],
  [2, 1, 0, 1, 1, 2, 1, 2],
  [1, 1, 2, 3, 1, 1, 0, 2],
  [1, 1, 0, 1, 1, 1, 2, 1],
  [2, 3, 1, 2, 2, 1, 2, 3],
  [1, 1, 1, 1, 2, 2, 0, 2],
  [1, 3, 2, 2, 1, 3, 2, 2]
]

tape('validMove should return true if tile is the same type and close by to the previous tile and within the board bounds', (t) => {
  let curr = [0, 0]
  let prev = [1, 0]
  let actual = validMove(curr, prev, board)
  t.ok(actual, 'validMove expects to be true')

  curr = [2, 3]
  prev = [2, 4]
  actual = validMove(curr, prev, board)
  t.ok(actual, 'validMove expects to be true')

  curr = [3, 0]
  prev = [2, 1]
  actual = validMove(curr, prev, board)
  t.ok(actual, 'validMove expects to be true')

  curr = [3, 0]
  prev = [5, 4]
  actual = validMove(curr, prev, board)
  t.ok(!actual, 'validMove expects to be false, tile too far away')

  curr = [0, 0]
  prev = [0, 1]
  actual = validMove(curr, prev, board)
  t.ok(!actual, 'validMove expects to be false, tile not the same type')

  curr = [-1, 0]
  prev = [0, 0]
  actual = validMove(curr, prev, board)
  t.ok(!actual, 'validMove expects to be false, tile out of bounds')

  t.end()
})
