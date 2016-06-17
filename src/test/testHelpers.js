import { booleanArray, leavingBoard, shiftBoard } from '../js/model/model.js'
import { mapFallingTiles } from '../js/model/mapFallingTiles.js'

export const board = [
  [ 2, 3, 3, 1, 2, 4, 4, 1 ],
  [ 2, 4, 2, 3, 2, 4, 1, 1 ],
  [ 2, 1, 4, 1, 1, 2, 1, 2 ],
  [ 1, 1, 2, 3, 1, 1, 4, 2 ],
  [ 1, 1, 4, 1, 1, 1, 2, 1 ],
  [ 2, 3, 1, 2, 2, 1, 2, 3 ],
  [ 1, 1, 1, 1, 2, 2, 4, 2 ],
  [ 1, 3, 2, 2, 1, 3, 2, 2 ]
]

export const sampleMove1 = [ [ 0, 0 ], [ 1, 0 ] ]
export const leaving1 = leavingBoard(sampleMove1, board)
export const sampleLeaving1 = booleanArray(leaving1)

export const isDraggingSample2 = booleanArray(leavingBoard([ [ 2, 0 ] ], board))

export const sampleMove2 = [ [ 6, 1 ], [ 6, 2 ], [ 5, 2 ], [ 4, 3 ] ]
export const leaving2 = leavingBoard(sampleMove2, board)
export const shiftedBoard = shiftBoard(leaving2)
export const magnitude2 = mapFallingTiles(leavingBoard(sampleMove2, board))
