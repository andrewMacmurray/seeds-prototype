import React from 'react'
import { addListener, removeListener } from 'spur-events'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators.js'
import Tile from './Tile.js'

class Board extends React.Component {
  constructor () {
    super()
    this.getTileClass = this.getTileClass.bind(this)
    this.getCoord = this.getCoord.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.checkTile = this.checkTile.bind(this)
    this.updateWeatherPower = this.updateWeatherPower.bind(this)
    this.addSeedsToScore = this.addSeedsToScore.bind(this)
    this.triggerWeather = this.triggerWeather.bind(this)
    this.removeTiles = this.removeTiles.bind(this)
    this.fallingMagnitudeClass = this.fallingMagnitudeClass.bind(this)
  }

  componentDidMount () {
    addListener(window, 'pointerup', this.stopDrag)
    setTimeout(() => this.props.resetEntering(), 600)
  }

  componentWillUnmount () {
    removeListener(window, 'pointerup', this.stopDrag)
  }

  getTileClass (num) {
    const tileClassMap = {
      1: 'sun',
      2: 'rain',
      3: 'seedling',
      4: 'pod'
    }
    return tileClassMap[num]
  }

  getCoord (e) {
    const x = parseInt(e.target.getAttribute('data-x'))
    const y = parseInt(e.target.getAttribute('data-y'))
    return [ y, x ]
  }

  checkMoveType (moves, board) {
    if (moves.length > 0) {
      const [ y, x ] = moves[0]
      const type = board[y][x]
      return this.getTileClass(type)
    }
  }

  updateWeatherPower (moves, board) {
    const type = this.checkMoveType(moves, board)
    this.props.addPowerToWeather(type)
  }

  addSeedsToScore () {
    const { moveArray, board } = this.props
    const type = this.checkMoveType(moveArray, board)
    this.props.updateScore(type, moveArray)
  }

  removeTiles (moveArray) {
    this.props.shiftTiles(moveArray, this.props.board)
    this.props.setEntering(this.props.board)
    this.props.resetMagnitude()
    this.props.resetLeaving()
  }

  stopDrag () {
    if (!this.props.updating && this.props.isDragging) {
      this.props.setDrag(false)
      const { moveArray, rain, sun } = this.props
      if (rain >= 12) this.triggerWeather('rain')
      if (sun >= 12) this.triggerWeather('sun')

      this.addSeedsToScore()
      this.props.isUpdating(true)
      this.props.stopDrag(this.props.board, moveArray)
      setTimeout(() => this.props.fallTiles(moveArray, this.props.board), 300)
      setTimeout(() => this.removeTiles(moveArray), 600)
      setTimeout(() => this.props.isUpdating(false), 600)
      setTimeout(() => this.props.addTiles(this.props.board), 800)
      setTimeout(() => this.props.resetGrowSeeds(), 1400)
      setTimeout(() => this.props.resetEntering(), 1500)
    }
  }

  startDrag (e) {
    if (!this.props.updating) {
      const { board, currTile } = this.props
      const tile = this.getCoord(e)
      this.props.setDrag(true)
      this.props.checkTile(tile, currTile, board)
      this.updateWeatherPower([ tile ], board)
    }
  }

  checkTile (e) {
    if (this.props.isDragging && !this.props.updating) {
      const { board, currTile } = this.props
      const tile = this.getCoord(e)
      this.props.checkTile(tile, currTile, board)
      this.updateWeatherPower(this.props.moveArray, board)
    }
  }

  animateBackground (type) {
    const weatherClass = type === 'rain' ? 'rain-falling' : 'sun-shining'
    const body = document.body.classList
    body.add(weatherClass)
    setTimeout(() => body.remove(weatherClass), 3000)
  }

  triggerWeather (type) {
    this.animateBackground(type)
    setTimeout(() => this.props.growSeeds(this.props.board), 700)
    setTimeout(() => this.props.transformBoard(this.props.growingMoves, this.props.board, 4), 1200)
    this.props.resetWeather(type)
  }

  fallingMagnitudeClass (tile) {
    return tile ? 'falling-' + tile : ''
  }

  weatherMakerClass (type) {
    return type + '-maker power-' + (this.props[type] < 12 ? this.props[type] : 12 + ' max-' + type)
  }

  render () {
    // console.log(JSON.stringify(this.props.isEnteringArray))
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
                  const tileType = this.getTileClass(tile)
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

import isDraggingArray from '../selectors/selector_isDraggingArray.js'
import isGrowingArray from '../selectors/selector_isGrowingArray.js'

const mapStateToProps = (state) => ({
  ...state,
  currTile: state.moves.currTile,
  moveArray: state.moves.moveArray,
  isDraggingArray: isDraggingArray(state),
  sun: state.weather.sun,
  rain: state.weather.rain,
  isGrowingArray: isGrowingArray(state)
})

export default connect(mapStateToProps, actions)(Board)
