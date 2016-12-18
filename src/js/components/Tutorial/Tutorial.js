import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import { connect } from 'react-redux'

import Board from '../Level/Board.js'
import handleNextTutorialStep from '../../redux/actionSequences/handleNextTutorialStep.js'

const textAnimations = {
  enter: {
    duration: 500,
    stagger: 500,
    animation: 'fadeIn'
  },
  leave: {
    duration: 500,
    animation: 'fadeOut'
  }
}

const boardAnimations = {
  enter: {
    duration: 500,
    delay: 1500,
    animation: 'fadeIn'
  },
  leave: {
    duration: 500,
    animation: 'fadeOut'
  }
}


class Tutorial extends React.PureComponent {

  renderText (text) {
    const { renderBlip } = this.props
    const height = text.length > 2 ? 'full' : 'half'
    return (
      <div key='text-container' className={'tutorial-text-container ' + height}>
        <VelocityTransitionGroup {...textAnimations}>
          {!renderBlip
            ? text.map((t, i) => <p key={i} className='tutorial-text'>{t}</p>)
            : ''
          }
        </VelocityTransitionGroup>
      </div>
    )
  }

  renderNext () {
    const { handleNextTutorialStep: next } = this.props
    return (
      <p key='next' onClick={next} className='next'>
        next
      </p>
    )
  }

  renderBoard (board) {
    const { board: { boardSize } } = this.props
    const disabled = board.disabled ? 'disabled' : ''

    return (
      <VelocityTransitionGroup key='board' {...boardAnimations}>
        {board.visible
          ? <div className={'tutorial-board-container board-x' + boardSize + ' ' + disabled}>
            <Board />
          </div>
          : ''
        }
      </VelocityTransitionGroup>
    )
  }

  render () {
    const {
      steps: tutorialSteps,
      step
    } = this.props
    const { text, board, order } = tutorialSteps[step]

    const renderMap = {
      text: this.renderText(text),
      next: this.renderNext(),
      board: this.renderBoard(board)
    }

    return (
      <div className='tutorial-container'>
        <div className='tutorial'>
          {order.map(item => renderMap[item])}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  ...state.tutorial,
  board: state.level.board
})

export default connect(mapStateToProps, { handleNextTutorialStep })(Tutorial)
