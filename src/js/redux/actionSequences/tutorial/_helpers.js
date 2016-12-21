import { compose, map, curry } from 'ramda'
import { fromMaybe, prop, at } from 'sanctuary'

export const getAutoSteps = curry((step, data) => compose(
  fromMaybe([]),
  map(prop('autoAt')),
  at(step - 1)
)(data))

export const getSubStepTotal = curry((step, data) => compose(
  fromMaybe(0),
  map(prop('total')),
  at(step - 1)
)(data))
