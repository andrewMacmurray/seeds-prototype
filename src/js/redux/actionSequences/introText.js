import * as _ from '../allActions.js'
import Promise from 'extends-promise'
import { makeLazyDispatcher } from '../helpers.js'

const text = [
  'our world is dying...',
  'we must gather many seeds...',
  'so a new one can be reborn...'
]

export default () => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  dispatch(_.resetIntroText())
  dispatch(_.setIntroText(text[0]))
  Promise.delay(5000)
    .then(_dispatch(_.setIntroText, text[1]))
    .delay(5000)
    .then(_dispatch(_.setIntroText, text[2]))
    .delay(5000)
    .then(_dispatch(_.resetIntroText))
    .then(_dispatch(_.showLoadingScreen))
    .delay(2500)
    .then(_dispatch(_.setView, 'board'))
    .delay(500)
    .then(_dispatch(_.hideLoadingScreen))
}
