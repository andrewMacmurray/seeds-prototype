import React from 'react'
import Board from './Board.js'

import '../../scss/style.scss'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <div className='logo'>
          <img src='img/seed-dark.png'/>
        </div>
        <Board />
      </div>
    )
  }
}
