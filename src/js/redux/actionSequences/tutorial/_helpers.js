import { compose, curry } from 'ramda'
import { fromMaybe, at } from 'sanctuary'

export const getTutorialData = curry((step, data) => compose(
  fromMaybe({ autoSteps: [], total: 0 }),
  at(step - 1)
)(data))
