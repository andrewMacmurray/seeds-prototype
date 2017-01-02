import React from 'react'
import { identity } from 'ramda'
import { connect } from 'react-redux'

import Level from './Level/Level.js'
import Hub from './Hub/Hub.js'
import TitleScreen from './TitleScreen.js'
import Tutorial from './Tutorial/Tutorial.js'
import Loading from './Loading.js'
import Intro from './Intro/Intro.js'

import Audio from './Audio.js'
import RainCurtain from './RainCurtain.js'

import { setView } from '../redux/allActions.js'
import flashLoadingScreen from '../redux/actionSequences/flashLoadingScreen.js'

import '../../scss/index.scss'

class App extends React.Component {

  router () {
    const viewMap = {
      title:    <TitleScreen />,
      level:    <Level />,
      intro:    <Intro />,
      hub:      <Hub />,
      tutorial: <Tutorial />
    }
    return viewMap[this.props.view]
  }

  loadView (view) {
    this.props.flashLoadingScreen(Math.random())
    setTimeout(() => this.props.setView(view), 1800)
  }

  renderLoadingScreen () {
    const { seedType } = this.props.level
    const { visible, background } = this.props.loadingScreen
    const classes = visible
      ? 'opacity-100'
      : 'opacity-0 disabled'

    return (
      <Loading
        background={background}
        seedType={seedType}
        className={classes}
        visible={visible}
      />
    )
  }

  handleFixedBackground (view, loading) {
    return view !== 'hub' || loading
      ? (e) => e.preventDefault()
      : identity
  }

  renderMenu (items) {
    return items.map((item, i) =>
      <p
        key={i}
        className='menu-item'
        onClick={() => this.loadView(item)}
      >
        {item}
      </p>
    )
  }

  render () {
    const { raindropsVisible } = this.props.level.weather
    const {
      backdrop,
      view,
      loadingScreen: { visible }
    } = this.props
    return (
      <div
        onTouchMove={this.handleFixedBackground(view, visible)}
        className={'backdrop ' + backdrop}
      >
        {this.renderLoadingScreen()}
        <div className='menu'>
          {this.renderMenu(['title', 'level', 'hub', 'tutorial'])}
        </div>
        <Audio />
        {this.router()}
        <RainCurtain raindropsVisible={raindropsVisible} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { setView, flashLoadingScreen })(App)
