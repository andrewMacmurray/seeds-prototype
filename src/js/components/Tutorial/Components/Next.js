import React from 'react'
import classnames from 'classnames'
import * as _ from './_stepHelpers.js'

export default (props) => {

  const classes = classnames(
    'next',
    _.visibleAt(
      props.step,
      props.subStep,
      props.renderStep,
      props.visibleAt
    )
  )

  return (
    <p
      className={classes}
      onClick={props.handleNextTutorialStep}
    >
      {props.text || 'next'}
    </p>
  )
}
