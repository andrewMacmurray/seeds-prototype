import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'
import { equals, contains, anyPass } from 'ramda'

const text1 = [
  'These are seedlings',
  'They are ready to burst into seed pods',
  'Connect them to grow them into seeds'
]

const renderLine = (text, visibleArr, step, subStep) =>
  <p className={
    'tutorial-text abs ' +
    _.visibleAt(step, subStep, 3, visibleArr)
  }>{text}</p>

const fullSeeds = equals([[4, 4], [4, 4]])
const halfSeeds = contains([4, 4])
const halfSeeds2 = equals([[4, 3], [4, 3]])
const halfSeeds3 = equals([[3, 4], [3, 4]])

const boardComplete = anyPass([
  fullSeeds,
  halfSeeds,
  halfSeeds2,
  halfSeeds3
])

export default ({ step, subStep, handleNextTutorialStep }) => {
  return (
    <div className={'tutorial-text-container ' + _.isVisble(step, 3)}>
      {renderLine(text1[0], [ 2, 3 ], step, subStep)}
      {renderLine(text1[1], [ 5 ], step, subStep)}
      {renderLine(text1[2], [ 7, 8 ], step, subStep)}
      <div className={
        'tutorial-board-container ' +
        _.visibleAt(step, subStep, 3, [ 1, 2, 3, 4, 5, 6, 7, 8 ]) + ' ' +
        _.enabledAt(step, subStep, 3, [ 8, 9 ])
      }>
        <Board />
      </div>
      <p
        className={'next ' + _.visibleAt(step, subStep, 3, [ 3, 4, 5, 6, 7 ])}
        onClick={handleNextTutorialStep}
      >next
      </p>
    </div>
  )
}
