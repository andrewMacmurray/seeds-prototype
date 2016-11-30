import React from 'react'
import World from './World.js'
import levelSettings from '../../constants/levelSettings.js'
import { connect } from 'react-redux'

class Hub extends React.PureComponent {
  render () {
    const { levelProgress } = this.props.level
    return (
      <div className='hub-container'>
        {levelSettings.map((settings, i) =>
          <World levelProgress={levelProgress} key={i} {...settings} />)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(Hub)
