import React from 'react'
import { validMove, randomBoard, shiftBoard, falseBoard, addNewTiles, mapMinusOnes, mapLeavingTiles, isFalling, mapFallingTiles } from '../model/model.js'
import Seed from './Seed.js'

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      board: randomBoard(),
      isLeavingArray: falseBoard(),
      isDraggingArray: falseBoard(),
      isFallingArray: falseBoard(),
      currTile: [],
      moveArray: [],
      isDragging: false,
      sunshine: 0,
      rain: 0
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
    this.addPowerToWeather = this.addPowerToWeather.bind(this)
    this.fallingClass = this.fallingClass.bind(this)
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

  addPowerToWeather (type) {
    const moves = this.state.moveArray
    const currentWeather = this.state[type]
    if (moves.length > 0) {
      const [y, x] = moves[0]
      const tile = this.state.board[y][x]
      if (tile === 1 && currentWeather + moves.length > 4) {
        this.weather('sun-shining')
        return 0
      } else if (tile === 2 && currentWeather + moves.length > 4) {
        this.weather('rain-falling')
        return 0
      } else if (tile === 1 || tile === 2) {
        return currentWeather + moves.length
      }
    }
  }

  stopDrag () {
    const sunshine = this.addPowerToWeather('sunshine') !== undefined ? this.addPowerToWeather('sunshine') : this.state.sunshine
    const rain = this.addPowerToWeather('rain') !== undefined ? this.addPowerToWeather('rain') : this.state.rain
    this.removeTiles()
    this.setState({
      isDragging: false,
      moveArray: [],
      currTile: [],
      sunshine,
      rain,
      isDraggingArray: falseBoard()
    })
  }

  startDrag (e) {
    const tile = this.getCoord(e)
    this.setState({
      isDragging: true,
      currTile: this.state.currTile.concat(tile),
      moveArray: this.state.moveArray.concat([tile]),
      isDraggingArray: mapLeavingTiles([tile], this.state.board)
    })
  }

  checkTile (e) {
    if (this.state.isDragging) {
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
    this.setState({ isLeavingArray: mapLeavingTiles(this.state.moveArray, this.state.board) })
  }

  shiftTiles (board) {
    this.setState({ board: shiftBoard(board), isLeavingArray: falseBoard(), isFallingArray: falseBoard() })
  }

  addNewTiles () {
    this.setState({ board: addNewTiles(this.state.board) })
  }

  weather (type) {
    const body = document.body.classList
    body.add(type)
    setTimeout(() => body.remove(type), 3000)
  }

  fallingClass(tile) {
    return tile ? 'falling-' + tile : ''
  }

  render () {
    // console.log(JSON.stringify(this.state.moveArray), this.state.sunshine, 'sun')
    return (
      <div>
          <div className='rain-maker'></div>
          <div className='sun-maker'></div>
          <div className='board'>
            {this.state.board.map((row, i) => (
                row.map((tile, j) => {
                  const tileType = this.setTileType(tile)
                  return (tile > -1)
                  ? <Seed
                  tileType={tileType}
                  startDrag={this.startDrag}
                  checkTile={this.checkTile}
                  key={'tile-' + i + '-' + j}
                  isLeavingBool={(this.state.isLeavingArray[i][j]) ? 'leaving' : ''}
                  isDraggingBool={(this.state.isDraggingArray[i][j]) ? 'dragging' : ''}
                  isFalling={this.fallingClass(this.state.isFallingArray[i][j])}
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
