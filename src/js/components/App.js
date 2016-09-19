import React from 'react'
import Board from './Board.js'
import TitleScreen from './TitleScreen.js'
import Loading from './Loading.js'
import Intro from './Intro.js'

import { connect } from 'react-redux'
import { setView } from '../actions/actionCreators.js'

import '../../scss/style.scss'

class App extends React.Component {
  router () {
    const viewMap = {
      title: <TitleScreen />,
      board: <Board />,
      loading: <Loading />,
      intro: <Intro />
    }
    return viewMap[this.props.view]
  }

  loadView (view) {
    this.props.setView('loading')
    setTimeout(() => this.props.setView(view), 3000)
  }

  render () {
    return (
      <div>
        <div className='menu'>
          <p className='menu-item' onClick={() => this.loadView('title')}>Intro</p>
          <p className='menu-item' onClick={() => this.loadView('board')}>Begin</p>
        </div>
        <audio src='./audio/martin-buttrich.mp3' controls />
        {this.router()}
      </div>
    )
  }
}

const mapStateToProps = state => ({ view: state.view })

export default connect(mapStateToProps, { setView })(App)
