import { addIndex, map, assoc, lensProp, over } from 'ramda'

const mapI = addIndex(map)

const addSubstepKey = mapI((substep, i) => assoc('substep', i + 1, substep))
const substepsLens = lensProp('substeps')

export const addSubstepNumbers = map(over(substepsLens, addSubstepKey))
