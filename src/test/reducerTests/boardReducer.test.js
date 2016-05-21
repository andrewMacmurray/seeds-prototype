import tape from 'tape'
import boardReducer from '../../js/reducers/reducer_board.js'
import { board } from '../testHelpers.js'

tape('board reducer with a START_DRAG action should', (t) => {
  let action = { type: 'START_DRAG', payload: undefined }
  let state = { isDragging: false, board, moveArray: [], currTile: [] }
  let actual = boardReducer(state, action)
  let expected = state

  t.deepEqual(actual, expected, 'if no tile is passed through START_DRAG, current state is returned')

  action = { type: 'START_DRAG', payload: [0, 0] }
  state = { isDragging: false, board, moveArray: [], currTile: [] }
  actual = boardReducer(state, action)
  expected = { isDragging: true, board, moveArray: [[0, 0]], currTile: [0, 0] }

  t.deepEqual(actual, expected, 'drag state should update to true, and moveArray and currTile should be update with tile payload')

  t.end()
})

tape('board reducer with a CHECK_TILE action should', (t) => {
  let action = { type: 'CHECK_TILE', payload: [1, 0] }
  let state = { isDragging: true, board, moveArray: [[0, 0]], currTile: [0, 0] }
  let actual = boardReducer(state, action)
  let expected = { isDragging: true, board, moveArray: [[0, 0], [1, 0]], currTile: [1, 0] }

  t.deepEqual(actual, expected, 'board reducer checks tile and returns correct updated state')

  action = { type: 'CHECK_TILE', payload: [0, 1] }
  state = { isDragging: true, board, moveArray: [[0, 0]], currTile: [0, 0] }
  actual = boardReducer(state, action)
  expected = state

  t.deepEqual(actual, expected, 'board reducer returns current state if dragging but an invalid move')

  action = { type: 'CHECK_TILE', payload: [1, 0] }
  state = { isDragging: true, board, moveArray: [[0, 0]], currTile: [0, 0] }
  actual = boardReducer(state, action)
  expected = { isDragging: true, board, moveArray: [[0, 0], [1, 0]], currTile: [1, 0] }

  t.deepEqual(actual, expected, 'board reducer checks tile and returns correct updated state')

  t.end()
})
