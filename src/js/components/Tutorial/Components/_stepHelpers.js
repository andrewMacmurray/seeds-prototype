import { contains, equals, map, curry } from 'ramda'

const o0 = 'opacity-0'
const disabled = 'disabled'

export const isVisble = (step, index) =>
  equals(step, index)
    ? ''
    : o0

const substepTuple = curry((step, steps) =>
  map(x => [ step, x ], steps))

const matchesCurrentStep = (disableClass) => (currentStep, currentSubStep, step, steps) =>
  contains([ currentStep, currentSubStep ], substepTuple(step, steps))
    ? ''
    : disableClass

export const visibleAt = matchesCurrentStep(o0)
export const enabledAt = matchesCurrentStep(disabled)
