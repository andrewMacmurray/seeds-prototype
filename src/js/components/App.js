import React from 'react'
import Board from './Board.js'
import Intro from './Intro.js'
import Loading from './Loading.js'

import { connect } from 'react-redux'
import { setView } from '../actions/actionCreators.js'

import '../../scss/style.scss'

class App extends React.Component {
  toggleView () {
    const { view } = this.props
    if (view === 'intro') return <Intro />
    if (view === 'board') return <Board />
    if (view === 'loading') return <Loading />
  }

  loadView (view) {
    this.props.setView('loading')
    setTimeout(() => this.props.setView(view), 3000)
  }

  render () {
    return (
      <div>
        <div className='menu'>
          <p className='menu-item' onClick={() => this.loadView('intro')}>Intro</p>
          <p className='menu-item' onClick={() => this.loadView('board')}>Begin</p>
        </div>
        <audio src='./audio/martin-buttrich.mp3' controls />
        {this.toggleView()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps, { setView })(App)
