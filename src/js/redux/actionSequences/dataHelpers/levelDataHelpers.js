import { compose, curry, propEq, prop, map, chain } from 'ramda'
import S from './sanctuaryDef.js'
const { fromMaybe, find } = S

export const getLevelData = curry((world, level, levelSettings) => compose(
  fromMaybe({}),
  chain(find(propEq('levelNumber', level))),
  map(prop('levels')),
  find(propEq('world', world))
)(levelSettings))
