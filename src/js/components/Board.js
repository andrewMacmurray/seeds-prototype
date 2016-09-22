import React from 'react'
import { addListener, removeListener } from 'spur-events'
import { connect } from 'react-redux'
import tileClassMap from '../constants/tileClasses.js'
import { resetEntering } from '../redux/allActions.js'
import stopDrag from '../redux/actionSequences/stopDrag.js'
import startDrag from '../redux/actionSequences/startDrag.js'
import checkTile from '../redux/actionSequences/checkTile.js'
import Tile from './Tile.js'

class Board extends React.Component {
  constructor () {
    super()
    this.getCoord = this.getCoord.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.checkTile = this.checkTile.bind(this)
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

  getTileAndType (e) {
    return [ this.getCoord(e), this.props.moveType ]
  }

  startDrag (e) {
    const [ tile, moveType ] = this.getTileAndType(e)
    this.props.startDrag(tile, moveType)
  }

  checkTile (e) {
    const [ tile, moveType ] = this.getTileAndType(e)
    this.props.checkTile(tile, moveType)
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

export default connect(mapStateToProps, { resetEntering, stopDrag, startDrag, checkTile })(Board)
