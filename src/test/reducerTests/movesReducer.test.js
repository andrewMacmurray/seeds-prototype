import tape from 'tape'
import movesReducer from '../../js/reducers/reducer_moves.js'
import { CHECK_TILE } from '../../js/actions/actionTypes.js'
import { falseBoard } from '../../js/model/model.js'
import { board, sampleMove1, sampleLeaving1, isDraggingSample2 } from '../testHelpers.js'


tape('movesReducer should return default state if unregognized action', (t) => {

  const action = { type: 'UNKNOWN' }
  const state = {
    moveArray: sampleMove1,
    currTile: sampleMove1[sampleMove1.length - 1]
  }
  const actual = movesReducer(state, action)
  const expected = state

  t.deepEqual(actual, expected, 'current state returned')
  t.end()

})


tape('movesReducer should check the current move against the previous one and return the new moves array and a new current tile', (t) => {

  const action = { type: CHECK_TILE,
    payload: {
      isDragging: true,
      tile: [1, 0],
      currTile: [0, 0],
      board,
      moves: sampleMove1
    }
  }
  const state = {
    moveArray: sampleMove1,
    currTile: sampleMove1[sampleMove1.length - 1]
  }
  const actual = movesReducer(state, action)
  const expected = {
    moveArray: sampleMove1.concat([[1, 0]]),
    currTile: [1, 0]
  }

  t.deepEqual(actual, expected, 'reducer adds valid move to the moves array and updates current tile')
  t.end()

})

tape('movesReducer should add a move to move array when no current move and set the current move to that tile', (t) => {
  const action = { type: CHECK_TILE,
    payload: {
      isDragging: true,
      tile: [ 2, 0 ],
      currTile: [],
      board,
      moves: []
    }
  }
  const state = {
    moveArray: [],
    currTile: []
  }
  const actual = movesReducer(state, action)
  const expected = {
    moveArray: [ [ 2, 0 ] ],
    currTile: [ 2, 0 ]
  }

  t.deepEqual(actual, expected, 'move added correctly when none present')
  t.end()

})
