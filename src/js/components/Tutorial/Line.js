import React from 'react'
import * as _ from './_helpers.js'
import classnames from 'classnames'

export default (props) => {
  const classes = classnames(
    'tutorial-text',
    _.visibleAt(
      props.step,
      props.subStep,
      props.renderStep,
      props.visibleAt
    )
  )
  return <p className={classes}>{props.text}</p>
}
