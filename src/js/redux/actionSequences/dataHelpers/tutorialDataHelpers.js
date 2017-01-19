import { curry, pipe, takeWhile, prop, chain } from 'ramda'
import S from './sanctuaryDef.js'
const { at, get, last, fromMaybe } = S

export const getTutorialData = curry((step, data) => pipe(
  at(step - 1),
  fromMaybe({ autoSteps: [], total: 0 })
)(data))


export const lastAuto = pipe(
  takeWhile(prop('auto')),
  last,
  chain(get(Number, 'substep')),
  fromMaybe(0)
)
