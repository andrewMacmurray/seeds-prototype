import React from 'react'
import ReactDOM from 'react-dom'

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
    const {
      backdrop,
      currentScore,
      seedType,
      levelGoal
    } = this.props

    const percentComplete = currentScore / levelGoal
    const screenHeight = this.state.seedHeight * percentComplete
    return (
      <div className='seed-bank'>
        <div
          className={'screen ' + backdrop}
          style={{ transform: `translateY(${-screenHeight}px)` }}
        />
        <img className='outline' src='img/outlines/teardrop-seed-outline.svg' />
        <img ref={(x) => this.seedImg = x} src={`img/seeds/${seedType}/${seedType}.svg`}/>
      </div>
    )
  }
}