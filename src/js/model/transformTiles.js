import { addIndex, map, filter } from 'ramda'

const mapWithIndex = addIndex(map)
// converts the tiles on the board to a new number
// where the board coordiantes match the coordiantes in an array of moves
export const transformTiles = (moves, board, transformNumber) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  filter(([ y, x ]) =>
    y === i && j === x)(moves).length ? transformNumber : tile
)(row))(board)
