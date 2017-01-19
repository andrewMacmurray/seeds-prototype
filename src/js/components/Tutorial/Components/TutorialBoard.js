import React from 'react'
import Board from '../../Level/Board.js'
import classnames from 'classnames'
import * as _ from './_stepHelpers.js'

export default (props) => {

  const boardClasses = classnames(
    'tutorial-board-container',
    _.visibleAt(props.step, props.substep, props.renderStep, props.visibleAt),
    _.enabledAt(props.step, props.substep, props.renderStep, props.enabledAt)
  )

  return (
    <div className={boardClasses}>
      <Board />
    </div>
  )
}
