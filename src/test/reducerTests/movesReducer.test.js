import tape from 'tape'
import movesReducer from '../../js/reducers/reducer_moves.js'
import { board } from '../testHelpers.js'

tape('moves reducer should check the current move against the previous one and return the new moves array and a new current tile', (t) => {
  let action = { type: 'CHECK_TILE',
    payload: {
      isDragging: true,
      tile: [1, 0],
      currTile: [0, 0],
      board
    }
  }
  let state = { moveArray: [[0, 0]], currTile: [0, 0] }
  let actual = movesReducer(state, action)
  let expected = { moveArray: [[0, 0], [1, 0]], currTile: [1, 0] }
  t.deepEqual(actual, expected, 'reducer adds valid move to the moves array and updates current tile')


  action = { type: 'CHECK_TILE',
    payload: {
      isDragging: true,
      tile: [2, 1],
      currTile: [3, 0],
      board
    }
  }
  state = { moveArray: [[3, 1], [3, 0]], currTile: [3, 0] }
  actual = movesReducer(state, action)
  expected = { moveArray: [[3, 1], [3, 0], [2, 1]], currTile: [2, 1] }
  t.deepEqual(actual, expected, 'reducer adds valid move to the moves array and updates current tile')

  action = { type: 'CHECK_TILE',
    payload: {
      isDragging: true,
      tile: [0, 0],
      currTile: [],
      board
    }
  }
  state = { moveArray: [], currTile: [] }
  actual = movesReducer(state, action)
  expected = { moveArray: [[0, 0]], currTile: [0, 0] }
  t.deepEqual(actual, expected, 'when no current move, reducer adds move to moves array and sets it to current tile')

  action = { type: 'OTHER_ACTION', payload: null }
  state = { moveArray: [[0, 0], [1, 0]], currTile: [1, 0] }
  actual = movesReducer(state, action)
  expected = { moveArray: [[0, 0], [1, 0]], currTile: [1, 0] }
  t.deepEqual(actual, expected, 'reducer returns state passed in if other action is called')

  t.end()
})
