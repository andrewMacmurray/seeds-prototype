import React from 'react'
import { identity } from 'ramda'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Level from './Level/Level.js'
import Hub from './Hub/Hub.js'
import TitleScreen from './TitleScreen.js'
import Tutorial from './Tutorial/Tutorial.js'
import Loading from './Loading.js'
import Intro from './Intro/Intro.js'
import Menu from './Menu.js'

import Audio from './Audio.js'
import RainCurtain from './RainCurtain.js'
import SunSphere from './SunSphere.js'

import { setView, openMenu, closeMenu } from '../redux/allActions.js'
import flashLoadingScreen from '../redux/actionSequences/flashLoadingScreen.js'

import '../../scss/index.scss'

class App extends React.Component {

  router () {
    const viewMap = {
      title:    <TitleScreen />,
      level:    <Level />,
      intro:    <Intro />,
      hub:      <Hub />,
      tutorial: <Tutorial {...this.props} />
    }
    return viewMap[this.props.view]
  }

  loadView = (view) => {
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

  handleReset () {
    window.localStorage.removeItem('state')
    window.location.reload()
  }

  renderMenu (menuVisibility) {
    return (
      <Menu
        menuItems={['title', 'level', 'hub', 'tutorial']}
        loadView={this.loadView}
        menuVisibility={menuVisibility}
        handleReset={this.handleReset}
        menuOpen={this.props.menu.open}
        open={this.props.openMenu}
        close={this.props.closeMenu}
      />
    )
  }

  render () {
    const {
      raindropsVisible,
      sunSphereVisible,
      overridePower
    } = this.props.level.weather
    const {
      backdrop,
      view,
      loadingScreen: { visible }
    } = this.props

    const backdropClasses = classnames(
      'backdrop',
      backdrop,
      { 'vh-100': view !== 'hub' }
    )

    const menuVisibility =
         view === 'tutorial'
      || view === 'intro'
      ? 'opacity-0'
      : ''

    return (
      <div
        onTouchMove={this.handleFixedBackground(view, visible)}
        className={backdropClasses}
      >
        {this.renderLoadingScreen()}
        {this.renderMenu(menuVisibility)}
        <Audio />
        <div onClick={this.props.closeMenu}>
          {this.router()}
        </div>
        <RainCurtain
          raindropsVisible={raindropsVisible}
          overridePower={overridePower}
        />
        <SunSphere sunSphereVisible={sunSphereVisible} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { setView, flashLoadingScreen, openMenu, closeMenu })(App)
