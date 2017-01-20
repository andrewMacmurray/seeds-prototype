import React from 'react'
import classnames from 'classnames'
import * as _ from './_stepHelpers.js'

export default (props) => {

  const classes = classnames(
    'next',
    _.visibleAt(
      props.step,
      props.substep,
      props.renderStep,
      props.visibleAt
    ),
    props.className
  )

  return (
    <p
      className={classes}
      onClick={props.stepForward}
    >
      {props.text || 'next'}
    </p>
  )
}
