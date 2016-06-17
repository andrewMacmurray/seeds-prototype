import R from 'ramda'

const growSeed = (x) => x === 3 && Math.random() >= 0.5 ? 4 : x
const growRow = R.map(growSeed)
export const growSeeds = R.map(growRow)

const growSeedBool = (x) => x === 3
const isGrowingRow = R.map(growSeedBool)
export const isGrowing = R.map(isGrowingRow)
