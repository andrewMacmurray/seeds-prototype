import React from 'react'
import { addListener, removeListener } from 'spur-events'
import { connect } from 'react-redux'
import {
  setDrag,
  stopDrag,
  isUpdating,
  resetLeaving,
  resetMagnitude,
  checkTile,
  shiftTiles,
  fallTiles,
  addTiles,
  growSeeds,
  addPowerToWeather,
  resetWeather,
  updateScore,
  removeSeeds,
  transformBoard
} from '../actions/actionCreators.js'
import Seed from './Seed.js'

class Board extends React.Component {
  constructor () {
    super()
    this.setTileType = this.setTileType.bind(this)
    this.getCoord = this.getCoord.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.checkTile = this.checkTile.bind(this)
    this.updateWeatherPower = this.updateWeatherPower.bind(this)
    this.addSeedsToScore = this.addSeedsToScore.bind(this)
    this.shineSun = this.shineSun.bind(this)
    this.rainFall = this.rainFall.bind(this)
    this.removeTiles = this.removeTiles.bind(this)
    this.fallingMagnitudeClass = this.fallingMagnitudeClass.bind(this)
  }

  componentDidMount () {
    addListener(window, 'pointerup', this.stopDrag)
  }

  componentWillUnmount () {
    removeListener(window, 'pointerup', this.stopDrag)
  }


  setTileType (num) {
    if (num === 1) return 'sun'
    else if (num === 2) return 'rain'
    else if (num === 3) return 'seedling'
    else if (num === 4) return 'pod'
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
      if (type === 1) return 'sun'
      else if (type === 2) return 'rain'
      else if (type === 3) return 'seedling'
      else if (type === 4) return 'pod'
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
    this.props.resetMagnitude()
    this.props.resetLeaving()
  }

  removeSeeds () {
    this.props.removeSeeds(this.props.board)
    setTimeout(() => {
      this.props.fallTiles([], this.props.board)
      // this.props.shiftTiles([], this.props.board)
      // this.props.resetMagnitude()
      // this.props.resetLeaving()
    }, 300)
    // setTimeout(() => this.props.addTiles(this.props.board), 800)
  }

  stopDrag () {
    if (!this.props.updating && this.props.isDragging) {
      this.props.setDrag(false)
      const { moveArray, rain, sun } = this.props
      if (rain >= 12) this.rainFall()
      if (sun >= 12) this.shineSun()

      this.addSeedsToScore()
      this.props.isUpdating(true)
      this.props.stopDrag(this.props.board, moveArray)
      setTimeout(() => this.props.fallTiles(moveArray, this.props.board), 300)
      setTimeout(() => this.removeTiles(moveArray), 600)
      setTimeout(() => this.props.isUpdating(false), 600)
      setTimeout(() => this.props.addTiles(this.props.board), 800)
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

  weather (type) {
    const body = document.body.classList
    body.add(type)
    setTimeout(() => body.remove(type), 3000)
  }

  shineSun () {
    this.weather('sun-shining')
    this.props.growSeeds(this.props.board)
    setTimeout(() =>
      this.props.transformBoard(this.props.transformMoves, this.props.board, 4),
    500)
    this.props.resetWeather('sun')
  }

  rainFall () {
    this.weather('rain-falling')
    this.props.growSeeds(this.props.board)
    setTimeout(() =>
      this.props.transformBoard(this.props.transformMoves, this.props.board, 4),
    500)
    this.props.resetWeather('rain')
  }

  fallingMagnitudeClass (tile) {
    return tile ? 'falling-' + tile : ''
  }

  weatherMakerClass (type) {
    return type + '-maker power-' + (this.props[type] < 12 ? this.props[type] : 12 + ' max-' + type)
  }

  render () {
    // console.log(JSON.stringify(this.props.board))
    // console.log(this.props.updating)
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
                    fallingMagnitudeArray
                  } = this.props
                  const tileType = this.setTileType(tile)
                  return tile > 0
                  ? <Seed
                    tileType={tileType}
                    startDrag={this.startDrag}
                    checkTile={this.checkTile}
                    key={'tile-' + i + '-' + j}
                    isLeavingBool={isLeavingArray[i][j] ? 'leaving' : ''}
                    isDraggingBool={isDraggingArray[i][j] ? 'dragging' : ''}
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

const mapStateToProps = (state) => {
  return {
    isDragging: state.isDragging,
    currTile: state.moves.currTile,
    moveArray: state.moves.moveArray,
    isDraggingArray: isDraggingArray(state),
    fallingMagnitudeArray: state.fallingMagnitude,
    sun: state.weather.sun,
    rain: state.weather.rain,
    score: state.score,
    board: state.board,
    isLeavingArray: state.leaving,
    updating: state.updating,
    transformMoves: state.transformMoves
  }
}

export default connect(mapStateToProps, {
  setDrag,
  stopDrag,
  isUpdating,
  resetLeaving,
  resetMagnitude,
  checkTile,
  fallTiles,
  growSeeds,
  shiftTiles,
  addTiles,
  addPowerToWeather,
  resetWeather,
  updateScore,
  removeSeeds,
  transformBoard
})(Board)
