import { sequence1 } from './Step1.js'
import { sequence2 } from './Step2.js'
import { sequence3 } from './Step3.js'
import { sequence4 } from './Step4.js'
import { sequence5 } from './Step5.js'

import { addIndex, map, assoc, lensProp, over } from 'ramda'

const sequence = [
  sequence1,
  sequence2,
  sequence3,
  sequence4,
  sequence5
]

const mapI = addIndex(map)
const addSubstepKey = mapI((substep, i) => assoc('substep', i + 1, substep))
const substepsLens = lensProp('substeps')
const addSubstepNumbers = map(over(substepsLens, addSubstepKey))

export default addSubstepNumbers(sequence)
