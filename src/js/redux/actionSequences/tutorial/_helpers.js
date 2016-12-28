import { compose, curry, propEq, prop, map, chain } from 'ramda'
import { fromMaybe, at, find } from 'sanctuary'

export const getTutorialData = curry((step, data) => compose(
  fromMaybe({ autoSteps: [], total: 0 }),
  at(step - 1)
)(data))

export const getLevelData = curry((world, level, levelSettings) => compose(
  fromMaybe({}),
  chain(find(propEq('levelNumber', level))),
  map(prop('levels')),
  find(propEq('world', world))
)(levelSettings))
