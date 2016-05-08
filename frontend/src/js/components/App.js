import React from 'react'
import Board from './Board.js'
import Intro from './Intro.js'

import '../../scss/style.scss'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <audio src='./audio/martin-buttrich.mp3' controls />
        <Board />
      </div>
    )
  }
}
