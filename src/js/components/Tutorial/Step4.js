import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'

const text1 = [
  'Connect the seedlings accross and diagonally',
  'Wonderful!',
  'The seeds now need to be harvested'
]

const renderLine = (text, visibleArr, step, subStep) =>
  <p className={
    'tutorial-text abs ' +
    _.visibleAt(step, subStep, 4, visibleArr)
  }>{text}</p>


export default ({ step, subStep, handleNextTutorialStep, checkComplete }) => {
  return (
    <div className={'tutorial-text-container ' + _.isVisble(step, 4)}>
      {renderLine(text1[0], [ 3, 4 ], step, subStep)}
      {renderLine(text1[1], [ 6 ], step, subStep)}
      {renderLine(text1[2], [ 8, 9 ], step, subStep)}
      <div
        className={
          'tutorial-board-container ' +
          _.visibleAt(step, subStep, 4, [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]) + ' ' +
          _.enabledAt(step, subStep, 4, [ 3 ])
        }
        onMouseUp={checkComplete}
      >
        <Board />
      </div>
      <p
        className={'next ' + _.visibleAt(step, subStep, 4, [ 4, 5, 6, 7, 8 ])}
        onClick={handleNextTutorialStep}
      >next
      </p>
    </div>
  )
}
