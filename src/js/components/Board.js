import React from 'react'
import { falseBoard, growSeeds, isGrowing } from '../model/model.js'
import { connect } from 'react-redux'
import {
  setDrag,
  stopDrag,
  resetLeaving,
  resetMagnitude,
  checkTile,
  shiftTiles,
  fallTiles,
  addTiles,
  addPowerToWeather,
  resetWeather,
  updateScore
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
    this.fallingMagnitudeClass = this.fallingMagnitudeClass.bind(this)
  }

  componentDidMount () {
    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('touchend', this.stopDrag)
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.stopDrag)
    window.addEventListener('touchend', this.stopDrag)
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
    const type = this.checkMoveType(this.props.moveArray, this.props.board)
    const moves = this.props.moveArray
    this.props.updateScore(type, moves)
  }

  stopDrag () {
    if (this.props.rain >= 6) this.rainFall()
    if (this.props.sun >= 6) this.shineSun()

    const { board, moveArray } = this.props
    this.addSeedsToScore()
    this.props.setDrag(false)
    this.props.stopDrag(board, moveArray)
    setTimeout(() => this.props.fallTiles(moveArray, board), 300)
    setTimeout(() => {
      this.props.shiftTiles(moveArray, board)
      this.props.resetMagnitude()
      this.props.resetLeaving()
    }, 600)
    setTimeout(() => this.props.addTiles(this.props.board), 800)
  }

  startDrag (e) {
    const { board, currTile } = this.props
    const tile = this.getCoord(e)
    this.props.setDrag(true)
    this.props.checkTile(tile, currTile, board)
    this.updateWeatherPower([ tile ], board)
  }

  checkTile (e) {
    if (this.props.isDragging) {
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
    this.props.resetWeather('sun')
    // const newBoard = growSeeds(this.props.board)
    // const isGrowingBoard = isGrowing(this.props.board)
    // this.setState({ board: newBoard, isGrowingArray: isGrowingBoard })
    // setTimeout(() => this.setState({ isGrowingArray: falseBoard() }), 500)
  }

  rainFall () {
    this.weather('rain-falling')
    this.props.resetWeather('rain')
    // console.log(this.props.rain)
    // const newBoard = growSeeds(this.props.board)
    // this.setState({ board: newBoard })
  }

  fallingMagnitudeClass (tile) {
    return tile ? 'falling-' + tile : ''
  }

  weatherMakerClass (type) {
    return type + '-maker power-' + (this.props[type] < 6 ? this.props[type] : 6 + ' max-' + type)
  }

  render () {
    // console.log(JSON.stringify(this.props.isDraggingArray))
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
// import isFallingArray from '../selectors/selector_fallingMagnitude.js'


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
    isLeavingArray: state.leaving
  }
}

export default connect(mapStateToProps, {
  setDrag,
  stopDrag,
  resetLeaving,
  resetMagnitude,
  checkTile,
  fallTiles,
  shiftTiles,
  addTiles,
  addPowerToWeather,
  resetWeather,
  updateScore
})(Board)
