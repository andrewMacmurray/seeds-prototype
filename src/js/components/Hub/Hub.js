import React from 'react'
import World from './World.js'
import levelSettings from '../../constants/levelSettings.js'
import { connect } from 'react-redux'
import startLevel from '../../redux/actionSequences/startLevel.js'

class Hub extends React.PureComponent {
  render () {
    const { levelProgress } = this.props.level
    return (
      <div className='hub-container'>
        {levelSettings.map((settings, i) =>
          <World
            startLevel={this.props.startLevel}
            levelProgress={levelProgress}
            key={i}
            {...settings}
          />)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps, { startLevel })(Hub)
