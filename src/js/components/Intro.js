import React from 'react'
import { connect } from 'react-redux'
// import CssTransitionGroup from 'react-addons-css-transition-group'
import { VelocityComponent } from 'velocity-react'
import introSequence from '../redux/actionSequences/introSequence.js'
import TwinSeed from '../components/Seeds/TwinSeed.js'
import SingleSeed from '../components/Seeds/SingleSeed.js'
import CircleSeed from '../components/Seeds/CircleSeed.js'

const text = [
  'our world is dying...',
  'we must gather many seeds...',
  'so a new one can be reborn...'
]

const seeds = [
  <CircleSeed key={0} seedType='small' />,
  <TwinSeed key={1} seedType='small twin-light' />,
  <TwinSeed key={2} seedType='small twin-dark' />,
  <TwinSeed key={3} seedType='small twin-red' />,
  <SingleSeed key={4} seedType='small' />
]

const animations = {
  entering: {
    duration: 1000,
    animation: { opacity: 1 }
  },
  leaving: {
    duration: 1000,
    animation: { opacity: 0 }
  }
}

class Intro extends React.Component {
  componentWillMount () {
    this.props.introSequence()
  }

  renderSeeds = () => {
    const { visibleSeeds } = this.props.intro
    const { entering, leaving } = animations

    return visibleSeeds.map((s, i) => {
      const animationProps = s
        ? entering
        : leaving
      return (
        <VelocityComponent key={i} {...animationProps}>
          {seeds[i]}
        </VelocityComponent>
      )
    })
  }

  renderText = (index) => {
    const { visibleText } = this.props.intro
    const { entering, leaving } = animations

    const animationProps = visibleText[index]
      ? entering
      : leaving

    return (
      <VelocityComponent {...animationProps}>
        <p className='intro-text'>{text[index]}</p>
      </VelocityComponent>
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
