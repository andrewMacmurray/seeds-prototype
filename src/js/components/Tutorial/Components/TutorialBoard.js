import React from 'react'
import Board from '../../Level/Board.js'
import classnames from 'classnames'
import * as _ from './_stepHelpers.js'

export default (props) => {
  const {
    step,
    substep,
    renderStep,
    visibleAt,
    enabledAt,
    rainDirection,
    sunDirection,
    seedDirection
  } = props

  const boardClasses = classnames(
    'tutorial-board-container',
    _.visibleAt(step, substep, renderStep, visibleAt),
    _.enabledAt(step, substep, renderStep, enabledAt)
  )

  return (
    <div className={boardClasses}>
      <Board
        rainDirection={rainDirection}
        sunDirection={sunDirection}
        seedDirection={seedDirection}
      />
    </div>
  )
}
