import React from 'react'
import ReactDOM from 'react-dom'
import SeedBankSvg from './SeedBankSvg.js'

export default class SeedBank extends React.PureComponent {
  constructor () {
    super()
    this.state = { seedHeight: 80 }
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
    const {
      currentScore,
      levelGoal
    } = this.props
    const { seedHeight } = this.state

    const percentComplete = currentScore / levelGoal
    return (
      <div className='seed-bank'>
        <img className='outline' src='img/outlines/teardrop-seed-outline-2.svg' />
        <SeedBankSvg
          ref={(x) => this.seedImg = x}
          seedHeight={seedHeight}
          percentComplete={percentComplete}
        />
      </div>
    )
  }
}
