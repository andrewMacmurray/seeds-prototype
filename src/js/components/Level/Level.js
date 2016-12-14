import React from 'react'
import { connect } from 'react-redux'

import Board from './Board.js'
import SeedBank from './SeedBank.js'

class Level extends React.PureComponent {

  weatherMakerClass (type) {
    const { weather, weather: { weatherThreshold } } = this.props
    return type
      + '-maker power-'
      + (weather[type] < weatherThreshold ? weather[type] : weatherThreshold)
      + ' max-' + type
  }

  render () {
    const {
      seedType,
      backdrop,
      score: { currentScore, levelGoal }
    } = this.props

    return (
      <div className='level-container'>
        <div className='top-bar-container'>
          <div className={this.weatherMakerClass('rain')} />
          <SeedBank
            seedType={seedType}
            currentScore={currentScore}
            levelGoal={levelGoal}
            backdrop={backdrop}
          />
          <div className={this.weatherMakerClass('sun')} />
        </div>
        <p className='score'>{currentScore} / {levelGoal}</p>
        <Board />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.level,
  backdrop: state.backdrop
})

export default connect(mapStateToProps)(Level)
