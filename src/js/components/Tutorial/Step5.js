import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'

const text1 = [
  'The seeds now need to be harvested',
  'Connect them to fill the seed bank',
  'Marvelous!',
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
      _.visibleAt(step, subStep, 5, visibleArr)
    }
    >{text}</p>

  render () {
    const { step, subStep, handleNextTutorialStep } = this.props
    return (
      <div className={'tutorial-text-container ' + _.isVisble(step, 5)}>
        {this.renderLine(text1[0], [ 1 ], step, subStep)}
        {this.renderLine(text1[1], [ 3 ], step, subStep)}
        {this.renderLine(text1[2], [ 4 ], step, subStep)}
        {this.renderLine(text1[3], [ 6, 7 ], step, subStep)}
        <div
          className={
            'tutorial-board-container ' +
            _.visibleAt(step, subStep, 5, [ 1, 2, 3, 4 ]) + ' ' +
            _.enabledAt(step, subStep, 5, [ 3 ])
          }
        >
          <Board />
        </div>
        <p
          className={'next ' + _.visibleAt(step, subStep, 5, [ 7 ])}
          onClick={handleNextTutorialStep}
        >begin
        </p>
      </div>
    )
  }
}
