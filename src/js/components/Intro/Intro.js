import React from 'react'
import { connect } from 'react-redux'
import introSequence from '../../redux/actionSequences/introSequence.js'
import TwinSeed from '../../components/Seeds/TwinSeed.js'
import SingleSeed from '../../components/Seeds/SingleSeed.js'
import CircleSeed from '../../components/Seeds/CircleSeed.js'

const text = [
  'our world is dying....',
  'we must gather many seeds....',
  'so a new one can be reborn....'
]

const seeds = [
  <CircleSeed key={0} seedType='small intro-seed' />,
  <TwinSeed key={1} seedType='small intro-seed twin-light' />,
  <TwinSeed key={2} seedType='small intro-seed twin-dark' />,
  <TwinSeed key={3} seedType='small intro-seed twin-red' />,
  <SingleSeed key={4} seedType='small intro-seed' />
]

class Intro extends React.Component {
  componentWillMount () {
    this.props.introSequence()
  }

  renderSeeds = () => {
    const { visibleSeeds } = this.props.intro

    return visibleSeeds.map((seed, i) => {
      const visibility = seed
        ? 'ts-linear'
        : 'opacity-0 ts-linear'
      return (
        <span key={i} className={visibility}>
          {seeds[i]}
        </span>
      )
    })
  }

  renderText = (index) => {
    const { visibleText } = this.props.intro

    const visibility = visibleText[index]
      ? 'ts-linear'
      : 'opacity-0 ts-linear'

    return (
      <span className={visibility}>
        <p className='intro-text'>{text[index]}</p>
      </span>
    )
  }

  render () {
    return (
      <div className='intro'>
        <div className='same-line'>
          {this.renderText(0)}
          {this.renderText(1)}
        </div>
        <div className='seed-container'>
          {this.renderSeeds()}
        </div>
        {this.renderText(2)}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { introSequence })(Intro)
