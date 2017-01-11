import React from 'react'
import classnames from 'classnames'
import * as _ from './_stepHelpers.js'

export default (props) => {

  const classes = classnames(
    'tutorial-text-container',
    props.className,
    _.isVisble(props.step, props.renderStep)
  )

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}
