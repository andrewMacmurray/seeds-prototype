import React from 'react'
import { connect } from 'react-redux'

import Board from '../Level/Board.js'

class Tutorial extends React.PureComponent {

  render () {
    const { tutorialText, boardVisibility } = this.props
    const visibilityClass = boardVisibility ? '' : 'hidden'

    return (
      <div className='tutorial-container'>
        <p className='tutorial-text'>{tutorialText}</p>
        <div className={'tutorial-board-container ' + visibilityClass}>
          <Board />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({ ...state.tutorial })

export default connect(mapStateToProps)(Tutorial)
