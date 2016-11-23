import { map, addIndex, reduce } from 'ramda'

export const mapWithIndex = addIndex(map)
export const reduceWithIndex = addIndex(reduce)

export const mapBoard = (transformFn, extraData) =>
  mapWithIndex((row, i) =>
  mapWithIndex((tile, j) =>
  transformFn(tile, i, j, extraData)
)(row))
