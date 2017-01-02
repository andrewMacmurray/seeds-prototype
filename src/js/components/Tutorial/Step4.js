import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'

const text1 = [
  'Seed pods can be connected across or diagonally',
  'Wonderful!'
]

export default class Step4 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { seedlingBoardComplete, subStep, step } = this.props
    const handleNext =
         seedlingBoardComplete
      && step === 4
      && (subStep === 3 || subStep === 4)

    setTimeout(() =>
      handleNext
        ? this.props.handleNextTutorialStep()
        : this.checkBoardComplete()
    , 300)
  }

  renderLine = (text, visibleArr, step, subStep) =>
    <p className={
      'tutorial-text abs ' +
      _.visibleAt(step, subStep, 4, visibleArr)
    }>{text}</p>

  render () {
    const { step, subStep, handleNextTutorialStep } = this.props
    return (
      <div className={'tutorial-text-container ' + _.isVisble(step, 4)}>
        {this.renderLine(text1[0], [ 3 ], step, subStep)}
        {this.renderLine(text1[1], [ 4 ], step, subStep)}
        <div
          className={
            'tutorial-board-container ' +
            _.visibleAt(step, subStep, 4, [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]) + ' ' +
            _.enabledAt(step, subStep, 4, [ 3 ])
          }
        >
          <Board />
        </div>
        <p
          className={'next ' + _.visibleAt(step, subStep, 4, [ 10 ])}
          onClick={handleNextTutorialStep}
        >next
        </p>
      </div>
    )
  }
}
