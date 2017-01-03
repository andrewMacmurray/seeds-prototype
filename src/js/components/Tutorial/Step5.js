import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'

const text1 = [
  'Now connect the seeds to fill the seed bank',
  'Connect as many seeds as you can in one go',
  'Marvelous!',
  'The more seeds you connect, the faster the seed bank will fill up',
  'Your first journey awaits...'
]

export default class Step4 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { podBoardComplete, subStep, step } = this.props
    const handleNext =
         podBoardComplete
      && step === 5
      && (subStep === 4 || subStep === 5)

    setTimeout(() =>
      handleNext
        ? this.props.handleNextTutorialStep()
        : this.checkBoardComplete()
    , 300)
  }

  renderLine = (text, visibleArr, step, subStep) =>
    <p className={
      'tutorial-text abs ' +
      _.visibleAt(step, subStep, 5, visibleArr)
    }
    >{text}</p>

  render () {
    const { step, subStep, handleNextTutorialStep } = this.props
    return (
      <div className={'tutorial-text-container ' + _.isVisble(step, 5)}>
        {this.renderLine(text1[0], [ 1, 2 ], step, subStep)}
        {this.renderLine(text1[1], [ 4 ], step, subStep)}
        {this.renderLine(text1[2], [ 5 ], step, subStep)}
        {this.renderLine(text1[3], [ 7 ], step, subStep)}
        {this.renderLine(text1[4], [ 9, 10 ], step, subStep)}
        <div
          className={
            'tutorial-board-container ' +
            _.visibleAt(step, subStep, 5, [ 1, 2, 3, 4, 5, 6, 7 ]) + ' ' +
            _.enabledAt(step, subStep, 5, [ 2, 3, 4 ])
          }
        >
          <Board />
        </div>
        <p
          className={'next ' + _.visibleAt(step, subStep, 5, [ 10 ])}
          onClick={handleNextTutorialStep}
        >begin
        </p>
      </div>
    )
  }
}
