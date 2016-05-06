import R from 'ramda'
import { left, right, up, down } from './directions.js'

const multiply = (x) => x * 3 + 1
const roundRandom = R.pipe(Math.random, multiply, Math.round)
const makeRow = () => R.times(roundRandom, 8)
export const randomBoard = () => R.times(makeRow, 8)

const falseRow = () => R.times(R.always(false), 8)
export const falseBoard = () => R.times(falseRow, 8)

const board = [
  [4, -1, 2, 2, -1, 3, -1, 2],
  [4, 3, 3, 1, 2, 3, 4, 3],
  [4, 4, 3, 2, 4, 1, 1, 4],
  [-1, 2, 4, 1, -1, 3, 2, 2],
  [4, 1, -1, 1, 2, 2, 4, 1],
  [3, 3, 4, 3, 2, -1, 1, 3],
  [2, 2, 4, 2, 2, 1, 2, 2],
  [3, 3, 2, 3, 1, 1, 2, 3]
]

// before and after tile values have to match
export const sameType = ([x2, y2], [x1, y1], board) => board[x2][y2] === board[x1][y1]

// after coordinate has to be within the bounds of the board
const inBounds = ([x2, y2]) => x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8

// move is valid if the x and y coordiantes are either plus 1 or minus one of the previous
// export const isNextTo = R.anyPass([right, down, left, up, topRight, bottomRight, bottomLeft, topLeft])
export const isNextTo = R.anyPass([right, down, left, up])

export const validMove = R.allPass([inBounds, isNextTo, sameType])
// const valid1 = validMove([0, 0], [0, 1], board)

// const zeroToMinusOne = (x) => R.equals(0, x) ? -1 : x
// const mapMinusOnes = R.map(zeroToMinusOne)
// export const makeMinusOnes = R.map(mapMinusOnes) // converts zeroes to minus ones

const isMinusOne = R.equals(-1)
const tile = (x) => x !== -1
const filterMinus = R.filter(isMinusOne)
const filterTiles = R.filter(tile)
export const shift = (board) => R.concat(filterMinus(board), filterTiles(board))
export const shiftBoard = R.map(shift) // shift minus 1 tiles to the top of the array
// console.log(shiftBoard(board), 'filter zeroes', filterTiles(board[0]), 'filter tiles')

const addRandomTile = (x) => isMinusOne(x) ? roundRandom() : x
const addNewRow = R.map(addRandomTile)
export const addNewTiles = R.map(addNewRow) // replaces minus 1 tiles with new random tiles

const mapWithIndex = R.addIndex(R.map)
export const mapMinusOnes = (moves, board) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  R.filter(([y, x]) =>
    y === i && j === x)(moves).length ? -1 : tile
)(row))(board)

export const mapLeavingTiles = (moves, board) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  R.filter(([y, x]) =>
    y === i && j === x)(moves).length
)(row))(board)

const growSeed = (x) => x === 3 ? 4 : x
const growRow = R.map(growSeed)
export const growSeeds = R.map(growRow)

const growSeedBool = (x) => x === 3
const isGrowingRow = R.map(growSeedBool)
export const isGrowing = R.map(isGrowingRow)

// const result = mapMinusOnes([[0, 0], [1, 1]], [[0, 1, 2, 3], [0, 1, 2, 3]])

const lowestTileIndex = R.lastIndexOf(-1)
const sliceFalling = (row) => R.slice(0, lowestTileIndex(row), row)
const sliceStatic = (row) => R.slice(lowestTileIndex(row), row.length, row)
const mapFalling = R.map(tile)
const mapStatic = R.map(R.always(false))

export const isFallingRow = (row) =>
  lowestTileIndex(row) > -1 ?
  R.concat(mapFalling(sliceFalling(row)), mapStatic(sliceStatic(row))) :
  mapStatic(row)

export const isFalling = R.map(isFallingRow)

const num = (x) => x === '' ? -1 : parseInt(x)
const splitSections = R.pipe(R.join(','), R.split('-1,'))
const cleanSection = R.pipe(R.split(','), R.map(num))
const cleanSections = R.map(cleanSection)
export const sections = (row) => cleanSections(splitSections(row))

const hasFallingTile = (x) => x.indexOf(-1) > -1
const magnitude = (row) => R.filter(hasFallingTile, sections(row)).length

const mapMag = (mg) => R.map(item => {
  if (item === -1) {
    mg--
    return 0
  } else {
    return mg
  }
})

export const fallingRow = (row) => {
  let mg = magnitude(row)
  const xs = sections(row)
  return R.flatten(R.map(mapMag(mg))(xs))
}

export const mapFallingTiles = R.map(fallingRow)
