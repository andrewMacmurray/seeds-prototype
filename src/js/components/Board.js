import React from 'react'
import { addListener, removeListener } from 'spur-events'
import { connect } from 'react-redux'
import tileClassMap from '../constants/tileClasses.js'
import allActions from '../redux/allActions.js'
import stopDrag from '../redux/actionSequences/stopDrag.js'
import Tile from './Tile.js'

class Board extends React.Component {
  constructor () {
    super()
    this.getCoord = this.getCoord.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.checkTile = this.checkTile.bind(this)
    this.updateWeatherPower = this.updateWeatherPower.bind(this)
    this.triggerWeather = this.triggerWeather.bind(this)
    this.fallingMagnitudeClass = this.fallingMagnitudeClass.bind(this)
  }

  componentDidMount () {
    const { stopDrag, resetEntering } = this.props
    addListener(window, 'pointerup', () => stopDrag(this.props.moveType))
    setTimeout(() => resetEntering(), 600)
  }

  componentWillUnmount () {
    const { stopDrag } = this.props
    removeListener(window, 'pointerup', () => stopDrag(this.props.moveType))
  }

  getCoord (e) {
    const x = parseInt(e.target.getAttribute('data-x'))
    const y = parseInt(e.target.getAttribute('data-y'))
    return [ y, x ]
  }

  updateWeatherPower () {
    const { moveType, addPowerToWeather } = this.props
    addPowerToWeather(moveType)
  }

  startDrag (e) {
    if (!this.props.updating) {
      const tile = this.getCoord(e)
      this.props.setDrag(true)
      this.props.checkTile(tile)
      this.updateWeatherPower()
    }
  }

  checkTile (e) {
    if (this.props.isDragging && !this.props.updating) {
      const tile = this.getCoord(e)
      this.props.checkTile(tile)
      this.updateWeatherPower()
    }
  }

  animateBackground (type) {
    const weatherClass = type === 'rain'
      ? 'rain-falling'
      : 'sun-shining'
    const body = document.body.classList
    body.add(weatherClass)
    setTimeout(() => body.remove(weatherClass), 3000)
  }

  triggerWeather (type) {
    this.animateBackground(type)
    setTimeout(() => this.props.growSeeds(), 700)
    setTimeout(() => this.props.transformBoard(4), 1200)
    this.props.resetWeather(type)
  }

  fallingMagnitudeClass (tile) {
    return tile ? `falling-${tile}` : ''
  }

  weatherMakerClass (type) {
    return type + '-maker power-' + (this.props[type] < 12 ? this.props[type] : 12 + ' max-' + type)
  }

  render () {
    return (
      <div className='board-container'>
        <div className='logo'><img src='img/seed-dark.png'/></div>
        <div className={this.weatherMakerClass('rain')}></div>
        <div className={this.weatherMakerClass('sun')}></div>
        <p className='score'>{this.props.score}</p>
        <div className='board'>
            {this.props.board.map((row, i) =>
                row.map((tile, j) => {
                  const {
                    isLeavingArray,
                    isDraggingArray,
                    fallingMagnitudeArray,
                    isEnteringArray,
                    isGrowingArray
                  } = this.props
                  const tileType = tileClassMap[tile]
                  return tile > 0
                  ? <Tile
                    tileType={tileType}
                    startDrag={this.startDrag}
                    checkTile={this.checkTile}
                    key={'tile-' + i + '-' + j}
                    isLeavingBool={isLeavingArray[i][j] ? 'leaving' : ''}
                    isDraggingBool={isDraggingArray[i][j] ? 'dragging' : ''}
                    isEnteringBool={isEnteringArray[i][j] ? 'entering' : ''}
                    isGrowingBool={isGrowingArray[i][j] ? 'growing' : ''}
                    isFalling={this.fallingMagnitudeClass(fallingMagnitudeArray[i][j])}
                    y={i}
                    x={j}
                    /> : ''
                }
              )
            )
          }
        </div>
      </div>
    )
  }
}

import isDraggingArray from '../redux/selectors/selector_isDraggingArray.js'
import isGrowingArray from '../redux/selectors/selector_isGrowingArray.js'
import moveType from '../redux/selectors/selector_moveType.js'

const mapStateToProps = (state) => ({
  ...state,
  currTile: state.moves.currTile,
  moveArray: state.moves.moveArray,
  isDraggingArray: isDraggingArray(state),
  sun: state.weather.sun,
  rain: state.weather.rain,
  isGrowingArray: isGrowingArray(state),
  moveType: moveType(state)
})

export default connect(mapStateToProps, { ...allActions, stopDrag })(Board)
