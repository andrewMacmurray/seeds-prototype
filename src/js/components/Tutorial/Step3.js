import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'

const text1 = [
  'These are seedlings',
  'They are ready to burst into seed pods',
  'Connect them to grow them into seeds',
  'Brilliant!'
]

const renderLine = (text, visibleArr, step, subStep) =>
  <p className={
    'tutorial-text abs ' +
    _.visibleAt(step, subStep, 3, visibleArr)
  }>{text}</p>


export default class Step3 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { boardComplete, subStep, step } = this.props
    const handleNext =
         boardComplete
      && step === 3
      && (subStep === 8 || subStep === 9)

    setTimeout(() =>
      handleNext
        ? this.props.handleNextTutorialStep()
        : this.checkBoardComplete()
    , 300)
  }

  render () {
    const { step, subStep, handleNextTutorialStep } = this.props
    return (
      <div className={'tutorial-text-container ' + _.isVisble(step, 3)}>
        {renderLine(text1[0], [ 3, 4 ], step, subStep)}
        {renderLine(text1[1], [ 6 ], step, subStep)}
        {renderLine(text1[2], [ 8, 9 ], step, subStep)}
        {renderLine(text1[3], [ 10, 11 ], step, subStep)}
        <div
          className={
            'tutorial-board-container ' +
            _.visibleAt(step, subStep, 3, [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]) + ' ' +
            _.enabledAt(step, subStep, 3, [ 8, 9 ])
          }
        >
          <Board />
        </div>
        <p
          className={'next ' + _.visibleAt(step, subStep, 3, [ 4, 5, 6, 7, 8 ])}
          onClick={handleNextTutorialStep}
        >next
        </p>
      </div>
    )
  }
}
