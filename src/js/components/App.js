import React from 'react'
import Board from './Board.js'
import TitleScreen from './TitleScreen.js'
import Loading from './Loading.js'
import Intro from './Intro.js'
import Audio from './Audio.js'
import RainCurtain from './RainCurtain.js'

import { connect } from 'react-redux'
import { setView, playAudio, stopAudio } from '../redux/allActions.js'
import flashLoadingScreen from '../redux/actionSequences/flashLoadingScreen.js'

import '../../scss/style.scss'

class App extends React.Component {
  router () {
    const viewMap = {
      title: <TitleScreen />,
      board: <Board />,
      intro: <Intro />
    }
    return viewMap[this.props.view]
  }

  loadView (view) {
    this.props.flashLoadingScreen(Math.random())
    setTimeout(() => this.props.setView(view), 1800)
  }

  renderLoadingScreen () {
    const { visible, background } = this.props.loadingScreen
    return visible
      ? <Loading background={background} />
      : ''
  }

  render () {
    const { isRaining } = this.props.weather
    return (
      <div>
        {this.renderLoadingScreen()}
        <div className='menu'>
          <p className='menu-item' onClick={() => this.loadView('title')}>Intro</p>
          <p className='menu-item' onClick={() => this.loadView('board')}>Begin</p>
        </div>
        <Audio />
        {this.router()}
        <RainCurtain isRaining={isRaining} />
        <div className='audio-controls'>
          <p className='menu-item' onClick={this.props.playAudio}>play</p>
          <p className='menu-item' onClick={this.props.stopAudio}>pause</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { setView, flashLoadingScreen, stopAudio, playAudio })(App)
