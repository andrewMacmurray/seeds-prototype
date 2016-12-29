import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Board from './Board.js'
import SeedBank from './SeedBank.js'

class Level extends React.PureComponent {

  weatherMakerClass (weatherType) {
    const { weather, weather: { weatherThreshold } } = this.props
    const currentPower = weather[weatherType] < weatherThreshold
      ? weather[weatherType]
      : weatherThreshold

    return cx(
      weatherType + '-maker',
      'power-' + currentPower,
      'max-' + weatherType
    )
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
