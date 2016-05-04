import tape from 'tape'
import { validMove, isNextTo, sameType, shift, shiftBoard, isFallingRow, sections, mapFallingRow } from '../js/model/model.js'

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

  // curr = [3, 0]
  // prev = [2, 1]
  // actual = validMove(curr, prev, board)
  // t.equal(actual, true, 'validMove expects to be true')

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

tape('shift and shiftBoard function should shift zeroes to end of array', (t) => {
  const leavingBoard = [
    [2, 3, 3, 1, 2, -1, -1, 1],
    [2, -1, 2, 3, 2, -1, 1, 1],
    [2, 1, -1, 1, 1, 2, 1, 2],
    [1, 1, 2, 3, 1, 1, -1, 2],
    [1, 1, -1, 1, 1, 1, 2, 1],
    [2, 3, 1, 2, 2, 1, 2, 3],
    [1, 1, 1, 1, 2, 2, -1, 2],
    [1, 3, 2, 2, 1, 3, 2, 2]
  ]
  let expected = [-1, -1, 2, 3, 3, 1, 2, 1]
  let actual = shift(leavingBoard[0])
  t.deepEqual(actual, expected, 'shift fn has shifted 0s in a single array to the end')

  expected = [
    [-1, -1, 2, 3, 3, 1, 2, 1],
    [-1, -1, 2, 2, 3, 2, 1, 1],
    [-1, 2, 1, 1, 1, 2, 1, 2],
    [-1, 1, 1, 2, 3, 1, 1, 2],
    [-1, 1, 1, 1, 1, 1, 2, 1],
    [2, 3, 1, 2, 2, 1, 2, 3],
    [-1, 1, 1, 1, 1, 2, 2, 2],
    [1, 3, 2, 2, 1, 3, 2, 2]
  ]
  actual = shiftBoard(leavingBoard)
  t.deepEqual(actual, expected, 'shiftBoard shifts entire boards 0s to the end')

  t.end()
})

tape('isFallingRow function should mark falling tiles as true and everything else as false', (t) => {
  let leavingRow = [1, 2, 3, -1, 2, 3, 2, 3]
  let expected = [true, true, true, false, false, false, false, false]
  let actual = isFallingRow(leavingRow)
  t.deepEqual(actual, expected, 'isFalling maps bolleans properly')

  leavingRow = [1, 2, 3, -1, 2, -1, 2, 3]
  expected = [true, true, true, false, true, false, false, false]
  actual = isFallingRow(leavingRow)
  t.deepEqual(actual, expected, 'isFalling maps bolleans properly')

  leavingRow = [1, 2, 3, 1, 2, 1, 2, 3]
  expected = [false, false, false, false, false, false, false, false]
  actual = isFallingRow(leavingRow)
  t.deepEqual(actual, expected, 'isFalling maps bolleans properly')

  t.end()
})

tape('falling sections functions should split each row into compartments', (t) => {
  let leavingRow = [1, 2, 4, -1, 1, -1, 3, 2]
  let expected = [[1, 2, 4, -1], [1, -1], [3, 2]]
  let actual = sections(leavingRow)
  t.deepEqual(actual, expected, 'sections are correctly split up')

  expected = [2, 2, 2, 0, 1, 0, 0, 0]
  actual = mapFallingRow(leavingRow)
  t.deepEqual(actual, expected, 'magnitude of falling tiles mapped correctly')

  leavingRow = [-1, -1, -1, 2, 2, -1, -1, -1]
  expected = [0, 0, 0, 3, 3, 0, 0, 0]
  actual = mapFallingRow(leavingRow)
  t.deepEqual(actual, expected, 'magnitude of falling tiles mapped correctly')

  leavingRow = [-1, 2, -1, 3, -1, -1, -1, -1]
  expected = [0, 5, 0, 4, 0, 0, 0, 0]
  actual = mapFallingRow(leavingRow)
  t.deepEqual(actual, expected, 'magnitude of falling tiles mapped correctly')

  t.end()
})
