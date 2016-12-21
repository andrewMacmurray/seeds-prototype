import { contains, equals, map, curry } from 'ramda'

const o0 = 'opacity-0'

export const isVisble = (step, index) =>
  equals(step, index)
    ? ''
    : o0

const subStepTuple = curry((step, steps) => map(x => [ step, x ], steps))

export const visibleAt = (currentStep, currentSubStep, step, steps) =>
  contains([ currentStep, currentSubStep ], subStepTuple(step, steps))
    ? ''
    : o0
