import R from 'ramda'
import { left, right, up, down, topLeft, topRight, bottomLeft, bottomRight } from './directions.js'

const multiply = (x) => x * 3 + 1
const roundRandom = R.pipe(Math.random, multiply, Math.round)
const makeRow = () => R.times(roundRandom, 8)
export const randomBoard = () => R.times(makeRow, 8)

const falseRow = () => R.times(R.always(false), 8)
export const falseBoard = () => R.times(falseRow, 8)

// before and after tile values have to match
export const sameType = ([ x2, y2 ], [ x1, y1 ], board) => board[x2][y2] === board[x1][y1]

// after coordinate has to be within the bounds of the board
const inBounds = ([ x2, y2 ]) => x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8

// move is valid if the x and y coordiantes are either plus 1 or minus one of the previous
export const isNextTo = R.anyPass([
  right, down, left, up,
  topRight, bottomRight, bottomLeft, topLeft
])
// export const isNextTo = R.anyPass([right, down, left, up]) // restrict to 4 directions

export const validMove = R.allPass([ inBounds, isNextTo, sameType ])

const isZero = R.equals(0)
const isTile = (tile) => tile !== 0
const filterZeroes = R.filter(isZero)
const filterTiles = R.filter(isTile)
export const shift = (board) => R.concat(filterZeroes(board), filterTiles(board))
export const shiftBoard = R.map(shift) // shift zero tiles to the top of the array

const addRandomTile = (x) => isZero(x) ? roundRandom() : x
const addNewRow = R.map(addRandomTile)
export const addNewTiles = R.map(addNewRow) // replaces zero (leaving) tiles with new random tiles

const mapWithIndex = R.addIndex(R.map)
export const leavingBoard = (moves, board) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  R.filter(([y, x]) =>
    y === i && j === x)(moves).length ? 0 : tile
)(row))(board)

export const booleanArray = R.map(R.map(x => x === 0))

const growSeed = (x) => x === 3 && Math.random() >= 0.5 ? 4 : x
const growRow = R.map(growSeed)
export const growSeeds = R.map(growRow)

const growSeedBool = (x) => x === 3
const isGrowingRow = R.map(growSeedBool)
export const isGrowing = R.map(isGrowingRow)


const num = (x) => x === '' ? 0 : parseInt(x)
const splitSections = R.pipe(R.join(','), R.split('0,'))
const cleanSection = R.pipe(R.split(','), R.map(num))
const cleanSections = R.map(cleanSection)
export const sections = (row) => cleanSections(splitSections(row))

const hasFallingTile = (x) => x.indexOf(0) > -1
const magnitude = (row) => R.filter(hasFallingTile, sections(row)).length

const mapMag = (mg) => R.map(item => {
  if (item === 0) {
    mg--
    return 0
  } else {
    return mg
  }
})

export const fallingRow = (row) => {
  const mg = mapMag(magnitude(row))
  const xs = sections(row)
  return R.flatten(R.map(mg)(xs))
}

export const mapFallingTiles = R.map(fallingRow)
