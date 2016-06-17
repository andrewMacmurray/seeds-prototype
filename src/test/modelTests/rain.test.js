import tape from 'tape'
import { rainRow, removeSeeds } from '../../js/model/model.js'
import { board } from '../testHelpers.js'

tape('rain row replace all the rain tiles with 0', (t) => {
  const actual = rainRow(board[0])
  const expected = [ 0, 3, 3, 1, 0, 4, 4, 1 ]

  t.deepEqual(actual, expected, 'correctly removes rain tiles')
  t.end()

})

tape('removeSeeds removes all rain tiles', (t) => {
  const actual = removeSeeds(board)
  const expected = [
    [ 0, 3, 3, 1, 0, 4, 4, 1 ],
    [ 0, 4, 0, 3, 0, 4, 1, 1 ],
    [ 0, 1, 4, 1, 1, 0, 1, 0 ],
    [ 1, 1, 0, 3, 1, 1, 4, 0 ],
    [ 1, 1, 4, 1, 1, 1, 0, 1 ],
    [ 0, 3, 1, 0, 0, 1, 0, 3 ],
    [ 1, 1, 1, 1, 0, 0, 4, 0 ],
    [ 1, 3, 0, 0, 1, 3, 0, 0 ]
  ]

  t.deepEqual(actual, expected, 'removes all rain tiles')
  t.end()

})
