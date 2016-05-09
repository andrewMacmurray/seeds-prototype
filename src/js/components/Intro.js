import React from 'react'
import TwinSeed from './Seeds/TwinSeed.js'
import CircleSeed from './Seeds/CircleSeed.js'
import SingleSeed from './Seeds/SingleSeed.js'

export default class Intro extends React.Component {
  render () {
    return (
      <div className='intro'>
        <div className='seed-container'>
          <CircleSeed seedType='three intro-seed' />
          <TwinSeed seedType='two twin-dark intro-seed'/>
          <TwinSeed seedType='one twin-light intro-seed'/>
          <TwinSeed seedType='two twin-red intro-seed'/>
          <SingleSeed seedType='three intro-seed' />
          <p className='title'>seed</p>
        </div>
      </div>
    )
  }
}
