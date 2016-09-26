import * as _ from '../allActions.js'
import { wait } from '../helpers/'

const text = [
  'our world is dying...',
  'we must gather many seeds...',
  'so a new one can be reborn...'
]

export default () => (dispatch) => {
  dispatch(_.resetIntroText())
  dispatch(_.setIntroText(text[0]))
  wait(6000)
    .then(() => dispatch(_.setIntroText(text[1])))
    .then(() => wait(6000))
    .then(() => dispatch(_.setIntroText(text[2])))
    .then(() => wait(6000))
    .then(() => {
      dispatch(_.resetIntroText())
      dispatch(_.setView('loading'))
    })
    .then(() => wait(3000))
    .then(() => dispatch(_.setView('board')))
}
