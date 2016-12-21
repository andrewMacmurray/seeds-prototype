import React from 'react'
import * as _ from './_helpers.js'

const text1 = [
  'You have embarked on a journey',
  'Across mountains, deserts, meadows and forests'
]

const text2 = [
  'To find the seeds of our dying world',
  'And assemble a great seed bank for our new world'
]

const renderLine = (text, visibleArr, step, subStep) =>
  <p className={'tutorial-text ' + _.visibleAt(step, subStep, 2, visibleArr)}>{text}</p>

export default ({ step, subStep, handleNextTutorialStep }) => {
  return (
    <div className={'tutorial-text-container ' + _.isVisble(step, 2)}>
      {renderLine(text1[0], [ 1, 2 ], step, subStep)}
      {renderLine(text1[1], [ 2 ], step, subStep)}
      {renderLine(text2[0], [ 4, 5 ], step, subStep)}
      {renderLine(text2[1], [ 5 ], step, subStep)}
      <p
        className={'next ' + _.visibleAt(step, subStep, 2, [ 1, 2, 3, 4, 5, 6 ])}
        onClick={handleNextTutorialStep}
      >next
      </p>
    </div>
  )
}
