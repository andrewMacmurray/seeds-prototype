import R from 'ramda'

const num = (x) => x === '' ? 0 : parseInt(x)
const splitSections = R.pipe(R.join(','), R.split('0,'))
const cleanSection = R.pipe(R.split(','), R.map(num))
const cleanSections = R.map(cleanSection)
export const sections = (row) => cleanSections(splitSections(row))

const hasFallingTile = (x) => x.indexOf(0) > -1
const magnitude = (row) => R.filter(hasFallingTile, sections(row)).length

const mapMag = (mg) => {
  let mag = mg
  return R.map(item => {
    if (item === 0) {
      mag--
      return 0
    } else {
      return mag
    }
  })
}

export const fallingRow = (row) => {
  const mg = mapMag(magnitude(row))
  const xs = sections(row)
  return R.flatten(R.map(mg)(xs))
}

export const mapFallingTiles = R.map(fallingRow)
