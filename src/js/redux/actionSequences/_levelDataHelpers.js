import { compose, curry, propEq, prop, map, chain } from 'ramda'
import { create, env } from 'sanctuary'
const { fromMaybe, at, find } = create({ checkTypes: false, env })

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
