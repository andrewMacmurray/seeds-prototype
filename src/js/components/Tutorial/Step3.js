import React from 'react'
import Board from '../Level/Board.js'
import * as _ from './_helpers.js'
import classnames from 'classnames'

const textContent = [
  'These are seed pods',
  'They are almost ready to bear seeds',
  'Connect them to release the seeds',
  'Brilliant!'
]

export default class Step3 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { seedlingBoardComplete, subStep, step } = this.props
    const handleNext =
         seedlingBoardComplete
      && step === 3
      && (subStep === 8 || subStep === 9)

    setTimeout(() =>
      handleNext
        ? this.props.handleNextTutorialStep()
        : this.checkBoardComplete()
    , 300)
  }

  renderLine = (text, visibleArr, step, subStep, key) => {
    const textClasses = classnames(
      'tutorial-text',
      'abs',
      _.visibleAt(step, subStep, 3, visibleArr)
    )
    return <p className={textClasses} key={key}>{text}</p>
  }

  renderLines = (lines, visibility, step, subStep) =>
    lines.map((text, i) =>
      this.renderLine(text, visibility[i], step, subStep, i))

  render () {
    const {
      step,
      subStep
    } = this.props
    const boardClasses = classnames(
      'tutorial-board-container',
      _.visibleAt(step, subStep, 3, [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]),
      _.enabledAt(step, subStep, 3, [ 8, 9 ])
    )

    return (
      <div className={'tutorial-text-container ' + _.isVisble(step, 3)}>
        {this.renderLines(textContent, [
          [ 3, 4 ],
          [ 6 ],
          [ 8, 9 ],
          [ 10, 11 ]
        ], step, subStep)}
        <div className={boardClasses}>
          <Board />
        </div>
        <p
          className={'next ' + _.visibleAt(step, subStep, 3, [ 4, 5, 6, 7, 8 ])}
          onClick={this.props.handleNextTutorialStep}
        >next
        </p>
      </div>
    )
  }
}
