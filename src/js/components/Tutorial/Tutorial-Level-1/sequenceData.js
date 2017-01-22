import { addSubstepNumbers } from '../tutorialDataHelpers.js'
import { sequence1 } from './Step1.js'
import { sequence2 } from './Step2.js'
import { sequence3 } from './Step3.js'
import { sequence4 } from './Step4.js'
import { sequence5 } from './Step5.js'

const sequence = [
  sequence1,
  sequence2,
  sequence3,
  sequence4,
  sequence5
]

export default addSubstepNumbers(sequence)
