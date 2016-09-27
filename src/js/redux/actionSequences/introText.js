import * as _ from '../allActions.js'
import Promise from 'extends-promise'
import { makeLazyDispatcher, batch } from '../helpers.js'

const text = [
  'our world is dying...',
  'we must gather many seeds...',
  'so a new one can be reborn...'
]

export default () => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  const transition = batch(dispatch, [
    _.resetIntroText,
    _.setView, 'loading'
  ])

  dispatch(_.resetIntroText())
  dispatch(_.setIntroText(text[0]))
  Promise.delay(5000)
    .then(_dispatch(_.setIntroText, text[1]))
    .delay(5000)
    .then(_dispatch(_.setIntroText, text[2]))
    .delay(5000)
    .then(transition)
    .delay(3000)
    .then(_dispatch(_.setView, 'board'))
}
