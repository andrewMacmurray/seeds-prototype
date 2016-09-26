import { compose, join, split, map, filter, flatten } from 'ramda'

const num = (x) => x === '' ? 0 : parseInt(x)
const splitSections = compose(split('0,'), join(','))
const cleanSection = compose(map(num), split(','))
const cleanSections = map(cleanSection)
export const sections = compose(cleanSections, splitSections)

const hasFallingTile = (x) => x.indexOf(0) > -1
const magnitude = (row) => filter(hasFallingTile, sections(row)).length

const mapMag = (mg) => {
  let mag = mg
  return map(item => {
    if (item === 0) {
      mag--
      return 0
    } else {
      return mag
    }
  })
}

const convertToMagnitude = compose(mapMag, magnitude)

export const fallingRow = (row) => {
  const nestedMagnitudes = map(convertToMagnitude(row))(sections(row))
  return flatten(nestedMagnitudes)
}

export const mapFallingTiles = map(fallingRow)
