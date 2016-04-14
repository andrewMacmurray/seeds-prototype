import tape from 'tape'
import { validMove, isNextTo, sameType } from '../js/helpers/model.js'

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

tape('sameType function should check if two different tiles are the same number', (t) => {
  let curr = [0, 0]
  let prev = [1, 0]
  let actual = sameType(curr, prev, board)
  let expected = true
  t.equal(actual, expected, 'sameType expects to be true')

  curr = [0, 0]
  prev = [1, 2]
  actual = sameType(curr, prev, board)
  expected = true
  t.equal(actual, expected, 'sameType expects to be true')

  curr = [0, 7]
  prev = [0, 6]
  actual = sameType(curr, prev, board)
  expected = false
  t.equal(actual, expected, 'sameType expects to be false')

  t.end()
})

tape('isNextTo function should check if the next tile is close to the previously selected tile', (t) => {
  let curr = [1, 0]
  let prev = [0, 0]
  let actual = isNextTo(curr, prev)
  let expected = true
  t.equal(actual, expected, 'isNextTo expects to be true')

  curr = [0, 0]
  prev = [0, 1]
  actual = isNextTo(curr, prev)
  expected = true
  t.equal(actual, expected, 'isNextTo expects to be true')

  curr = [0, 0]
  prev = [1, 2]
  actual = isNextTo(curr, prev)
  expected = false
  t.equal(actual, expected, 'isNextTo expects to be false, tile is too far')

  curr = [2, 2]
  prev = [2, 2]
  actual = isNextTo(curr, prev)
  expected = false
  t.equal(actual, expected, 'isNextTo expects to be false, same tile should not be valid')

  t.end()
})

tape('validMove should return true if tile is the same type and close by to the previous tile and within the board bounds', (t) => {
  let curr = [0, 0]
  let prev = [1, 0]
  let actual = validMove(curr, prev, board)
  t.equal(actual, true, 'validMove expects to be true')

  curr = [2, 3]
  prev = [2, 4]
  actual = validMove(curr, prev, board)
  t.equal(actual, true, 'validMove expects to be true')

  curr = [3, 0]
  prev = [2, 1]
  actual = validMove(curr, prev, board)
  t.equal(actual, true, 'validMove expects to be true')

  curr = [0, 0]
  prev = [1, 5]
  actual = validMove(curr, prev, board)
  t.equal(actual, false, 'validMove expects to be false, tile too far away')

  curr = [0, 0]
  prev = [1, 2]
  actual = validMove(curr, prev, board)
  t.equal(actual, false, 'validMove expects to be false, tile too far away even though it is the same type')

  curr = [0, 0]
  prev = [0, 1]
  actual = validMove(curr, prev, board)
  t.equal(actual, false, 'validMove expects to be false, tile not the same type')

  curr = [-1, 0]
  prev = [0, 0]
  actual = validMove(curr, prev, board)
  t.equal(actual, false, 'validMove expects to be false, tile out of bounds')

  t.end()
})
