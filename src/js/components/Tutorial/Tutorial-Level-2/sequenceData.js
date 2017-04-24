import { addSubstepNumbers } from '../tutorialDataHelpers.js'
import { sequence1 } from './Step1.js'
import { sequence2 } from './Step2.js'
import { sequence3 } from './Step3.js'

const sequence = [
  sequence1,
  sequence2,
  sequence3
]

export default addSubstepNumbers(sequence)
