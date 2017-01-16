import React from 'react'
import { connect } from 'react-redux'

import Board from './Board.js'
import SeedBank from './SeedBank.js'
import WeatherShard from './WeatherShard.js'

class Level extends React.PureComponent {

  render () {
    const {
      seedType,
      score: { currentScore, levelGoal },
      weather: { sun, rain, threshold, sunSphereVisible, raindropsVisible }
    } = this.props

    return (
      <div className='level-container'>
        <div className='top-bar-container'>
          <WeatherShard
            type='rain'
            power={rain}
            weatherVisible={raindropsVisible}
            threshold={threshold}
          />
          <SeedBank
            seedType={seedType}
            currentScore={currentScore}
            levelGoal={levelGoal}
          />
          <WeatherShard
            type='sun'
            power={sun}
            weatherVisible={sunSphereVisible}
            threshold={threshold}
          />
        </div>
        <p className='score'>{currentScore} / {levelGoal}</p>
        <Board />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.level
})

export default connect(mapStateToProps)(Level)
