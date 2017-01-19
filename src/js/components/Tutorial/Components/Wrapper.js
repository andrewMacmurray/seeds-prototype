import React from 'react'
import classnames from 'classnames'
import * as _ from './_stepHelpers.js'

export default (props) => {

  const classes = classnames(
    _.visibleAt(
      props.step,
      props.substep,
      props.renderStep,
      props.visibleAt
    ),
    props.className
  )

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}
