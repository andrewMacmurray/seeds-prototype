import React from 'react'
import * as _ from './_stepHelpers.js'
import classnames from 'classnames'

export default (props) => {

  const classes = classnames(
    'tutorial-text',
    _.visibleAt(
      props.step,
      props.subStep,
      props.renderStep,
      props.visibleAt
    ),
    { abs: props.sameLine }
  )

  return <p className={classes}>{props.text}</p>
}
