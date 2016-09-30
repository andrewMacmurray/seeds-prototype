import React from 'react'
import { connect } from 'react-redux'
import introSequence from '../redux/actionSequences/introText.js'
import TwinSeed from '../components/Seeds/TwinSeed.js'

class Intro extends React.Component {
  componentWillMount () {
    this.props.introSequence()
  }

  render () {
    const { introText } = this.props.text
    return (
      <div className='intro'>
        <p className='intro-text'>{introText}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { introSequence })(Intro)
