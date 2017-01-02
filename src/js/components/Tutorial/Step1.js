import React from 'react'
import * as _ from './_helpers.js'

const text1 = 'Welcome traveller'

const renderLine = (text, visibleArr, step, subStep) =>
  <p className={'tutorial-text ' + _.visibleAt(step, subStep, 1, visibleArr)}>{text}</p>

export default ({ step, subStep, handleNextTutorialStep }) => {
  return (
    <div className={'tutorial-text-container justify-center ' + _.isVisble(step, 1)}>
      {renderLine(text1, [ 2, 3 ], step, subStep)}
      <p
        className={'next ' + _.visibleAt(step, subStep, 1, [ 3, 4 ])}
        onClick={handleNextTutorialStep}
      >next
      </p>
    </div>
  )
}
