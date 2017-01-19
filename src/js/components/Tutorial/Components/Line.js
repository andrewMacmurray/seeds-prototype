import React from 'react'
import * as _ from './_stepHelpers.js'
import classnames from 'classnames'
import { test, match, pipe, ifElse, map, trim, prop, splitAt } from 'ramda'

const hasNewLine = test(/\n/)
const newLineIndex = pipe(
  match(/\n/),
  prop('index')
)

const splitAtIndex = (text) => pipe(
  splitAt(newLineIndex(text)),
  map(trim)
)(text)

const splitText = ifElse(
  hasNewLine,
  splitAtIndex,
  (x) => [ x ]
)

export default (props) => {

  const classes = classnames(
    'tutorial-text',
    props.className,
    _.visibleAt(
      props.step,
      props.substep,
      props.renderStep,
      props.visibleAt
    ),
    { abs: props.sameLine }
  )

  const textToRender = splitText(props.text).map(x => <span>{x}<br/></span>)

  return <p className={classes}>{textToRender}</p>
}
