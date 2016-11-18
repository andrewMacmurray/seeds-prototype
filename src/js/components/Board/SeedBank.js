import React from 'react'
import ReactDOM from 'react-dom'

const levelGoal = 500

export default class SeedBank extends React.PureComponent {
  constructor () {
    super()
    this.state = { seedHeight: 0 }
  }

  componentDidMount () {
    this.storeSeedHeight()
  }

  componentWillReceiveProps () {
    this.storeSeedHeight()
  }

  storeSeedHeight () {
    const $el = ReactDOM.findDOMNode(this.seedImg)
    const seedHeight = $el.clientHeight
    this.setState({ seedHeight })
  }

  render () {
    const percentComplete = this.props.score / levelGoal
    const screenHeight = this.state.seedHeight * percentComplete 
    return (
      <div className='seed-bank' onClick={this.props.harvestSeeds}>
        <div
          className={'screen ' + this.props.backdrop}
          style={{ transform: `translateY(${-screenHeight}px)` }}
        />
        <img className='outline' src='img/seed-outline.svg' />
        <img ref={(x) => this.seedImg = x} src='img/seed.svg'/>
      </div>
    )
  }
}
