import React from 'react'
import { validMove, randomBoard, shiftBoard, falseBoard, addNewTiles, mapMinusOnes, mapLeavingTiles, isFalling, mapFallingTiles, growSeeds, isGrowing } from '../model/model.js'
import { connect } from 'react-redux'
import { setDrag, addPowerToWeather, resetWeather, updateScore } from '../actions/actions_index.js'
import Seed from './Seed.js'

class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      board: randomBoard(),
      isLeavingArray: falseBoard(),
      isDraggingArray: falseBoard(),
      isFallingArray: falseBoard(),
      isGrowingArray: falseBoard(),
      currTile: [],
      moveArray: [],
      score: 0
    }
    this.setTileType = this.setTileType.bind(this)
    this.getCoord = this.getCoord.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.checkTile = this.checkTile.bind(this)
    this.removeTiles = this.removeTiles.bind(this)
    this.addNewTiles = this.addNewTiles.bind(this)
    this.fallingTiles = this.fallingTiles.bind(this)
    this.shiftTiles = this.shiftTiles.bind(this)
    this.isLeaving = this.isLeaving.bind(this)
    this._addPowerToWeather = this._addPowerToWeather.bind(this)
    this.calculateWeatherPower = this.calculateWeatherPower.bind(this)
    this.addSeedsToScore = this.addSeedsToScore.bind(this)
    this.shineSun = this.shineSun.bind(this)
    this.rainFall = this.rainFall.bind(this)
    this.fallingMagnitudeClass = this.fallingMagnitudeClass.bind(this)
  }

  componentDidMount () {
    window.addEventListener('mouseup', this.stopDrag)
  }

  setTileType (num) {
    if (num === 1) return 'sun'
    else if (num === 2) return 'rain'
    else if (num === 3) return 'seedling'
    else if (num === 4) return 'pod'
  }

  getCoord (e) {
    const x = parseInt(e.target.getAttribute('data-x'), 10)
    const y = parseInt(e.target.getAttribute('data-y'), 10)
    return [y, x]
  }

  checkMoveType (moves, board) {
    if (moves.length > 0) {
      const [y, x] = moves[0]
      const type = board[y][x]
      if (type === 1) return 'sun'
      else if (type === 2) return 'rain'
      else if (type === 3) return 'seedling'
      else if (type === 4) return 'pod'
    }
  }

  calculateWeatherPower (type) {
    if (type === 'sun' || type === 'rain') {
      const moves = this.state.moveArray
      const currentWeather = this.state[type]
      return moves.length > 0 ? currentWeather + moves.length : currentWeather
    }
  }

  _addPowerToWeather () {
    const type = this.checkMoveType(this.state.moveArray, this.state.board)
    this.props.addPowerToWeather(type, this.state.moveArray.length)
  }

  addSeedsToScore () {
    const type = this.checkMoveType(this.state.moveArray, this.state.board)
    const moves = this.state.moveArray
    this.props.updateScore(type, moves)
  }

  stopDrag () {
    if (this.state.moveArray.length > 0) {
      this._addPowerToWeather()
      this.addSeedsToScore()
      this.removeTiles()
    }
    this.props.setDrag(false)
    this.setState({
      moveArray: [],
      currTile: [],
      isDraggingArray: falseBoard()
    })
  }

  startDrag (e) {
    const tile = this.getCoord(e)
    this.props.setDrag(true)
    this.setState({
      currTile: this.state.currTile.concat(tile),
      moveArray: this.state.moveArray.concat([tile]),
      isDraggingArray: mapLeavingTiles([tile], this.state.board)
    })
  }

  checkTile (e) {
    if (this.props.isDragging) {
      const currTile = this.getCoord(e)
      if (validMove(currTile, this.state.currTile, this.state.board)) {
        const moveArray = this.state.moveArray.concat([currTile])
        const isDraggingArray = mapLeavingTiles(moveArray, this.state.board)
        this.setState({
          currTile,
          moveArray,
          isDraggingArray
        })
      }
    }
  }

  removeTiles () {
    const minusOneBoard = mapMinusOnes(this.state.moveArray, this.state.board)
    this.isLeaving()
    setTimeout(() => this.fallingTiles(minusOneBoard), 400)
    setTimeout(() => this.shiftTiles(minusOneBoard), 600)
    setTimeout(() => this.addNewTiles(), 600)
  }

  fallingTiles (board) {
    this.setState({ isFallingArray: mapFallingTiles(board) })
  }

  isLeaving () {
    const leavingTiles = mapLeavingTiles(this.state.moveArray, this.state.board)
    this.setState({ isLeavingArray: leavingTiles })
  }

  shiftTiles (board) {
    this.setState({
      board: shiftBoard(board),
      isLeavingArray: falseBoard(),
      isFallingArray: falseBoard()
    })
  }

  addNewTiles () {
    this.setState({ board: addNewTiles(this.state.board) })
  }

  weather (type) {
    const body = document.body.classList
    body.add(type)
    setTimeout(() => body.remove(type), 3000)
  }

  shineSun () {
    if (this.props.sun >= 12) {
      this.weather('sun-shining')
      this.props.resetWeather('sun')
      const newBoard = growSeeds(this.state.board)
      const isGrowingBoard = isGrowing(this.state.board)
      this.setState({ board: newBoard, isGrowingArray: isGrowingBoard })
      setTimeout(() => this.setState({ isGrowingArray: falseBoard() }), 500)
    }
  }

  rainFall () {
    if (this.props.rain >= 12) {
      this.weather('rain-falling')
      this.props.resetWeather('rain')
      const newBoard = growSeeds(this.state.board)
      this.setState({ board: newBoard })
    }
  }

  fallingMagnitudeClass (tile) {
    return tile ? 'falling-' + tile : ''
  }

  weatherMakerClass (type) {
    return type + '-maker power-' + (this.props[type] < 12 ? this.props[type] : 12 + ' max-' + type)
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <div className='logo'><img src='img/seed-dark.png'/></div>
        <div onClick={this.rainFall} className={this.weatherMakerClass('rain')}></div>
        <div onClick={this.shineSun} className={this.weatherMakerClass('sun')}></div>
        <p className='score'>{this.props.score}</p>
          <div className='board'>
            {this.state.board.map((row, i) => (
                row.map((tile, j) => {
                  const { isLeavingArray, isDraggingArray, isGrowingArray, isFallingArray } = this.state
                  const tileType = this.setTileType(tile)
                  return (tile > -1)
                  ? <Seed
                  tileType={tileType}
                  startDrag={this.startDrag}
                  checkTile={this.checkTile}
                  key={'tile-' + i + '-' + j}
                  isLeavingBool={(isLeavingArray[i][j]) ? 'leaving' : ''}
                  isDraggingBool={(isDraggingArray[i][j]) ? 'dragging' : ''}
                  isGrowingBool={(isGrowingArray[i][j]) ? 'growing' : ''}
                  isFalling={this.fallingMagnitudeClass(isFallingArray[i][j])}
                  y={i}
                  x={j}/> : ''
                }
              )
            )
          )}
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isDragging: state.isDragging,
    sun: state.weather.sun,
    rain: state.weather.rain,
    score: state.score
  }
}

export default connect(mapStateToProps, { setDrag, addPowerToWeather, resetWeather, updateScore })(Board)
