import React from 'react'
import { validMove, randomBoard, roundRandom, shiftBoard, falseBoard, addNewTiles, makeMinusOnes, mapZeroes, _isLeaving } from '../helpers/model.js'
import Seed from './Seed.js'

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      board: randomBoard(),
      isLeavingArray: falseBoard(),
      isFallingArray: falseBoard(),
      currTile: [],
      moveArray: [],
      isDragging: false
    }
    this.tileType = this.tileType.bind(this)
    this.checkTile = this.checkTile.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
    this.getCoord = this.getCoord.bind(this)
    this.addNewTiles = this.addNewTiles.bind(this)
    this.shiftTiles = this.shiftTiles.bind(this)
    this.isLeaving = this.isLeaving.bind(this)
    this.mapMoves = this.mapMoves.bind(this)
  }

  componentDidMount () {
    window.addEventListener('mouseup', this.stopDrag)
  }

  stopDrag () {
    this.removeTiles()
    this.setState({
      isDragging: false,
      moveArray: [],
      currTile: []
    })
  }

  getCoord (e) {
    const x = parseInt(e.target.getAttribute('data-x'), 10)
    const y = parseInt(e.target.getAttribute('data-y'), 10)
    return [y, x]
  }

  startDrag (e) {
    const tile = this.getCoord(e)
    this.setState({
      isDragging: true,
      currTile: this.state.currTile.concat(tile),
      moveArray: this.state.moveArray.concat([tile])
    })
  }

  checkTile (e) {
    if (this.state.isDragging) {
      const tile = this.getCoord(e)
      if (validMove(tile, this.state.currTile, this.state.board)) {
        this.setState({
          currTile: tile,
          moveArray: this.state.moveArray.concat([tile])
        })
      }
    }
  }

  mapMoves ({ board, moves, newValue, initialValue }) {
    return board.map((row, i) => row.map((tile, j) => {
      let val = (initialValue === false) ? false : tile
      moves.forEach(([y, x]) => {
        if (y === i && j === x) val = newValue
      })
      return val
    }))
  }

  removeTiles () {
    const zeroBoard = mapZeroes(this.state.moveArray, this.state.board)
    this.isLeaving()
    setTimeout(() => {
      this.setState({ board: zeroBoard })
    }, 500)
    setTimeout(this.shiftTiles, 500)
    setTimeout(this.addNewTiles, 1000)
  }

  shiftTiles () {
    const minusOneBoard = makeMinusOnes(this.state.board)
    this.setState({
      board: shiftBoard(minusOneBoard),
      isLeavingArray: falseBoard()
    })
  }

  addNewTiles () {
    this.setState({ board: addNewTiles(this.state.board) })
  }

  tileType (num) {
    if (num === 1) return 'sun'
    else if (num === 2) return 'rain'
    else if (num === 3) return 'seedling'
    else if (num === 4) return 'pod'
  }

  isLeaving () {
    const leaving = _isLeaving(this.state.moveArray, this.state.board)
    this.setState({ isLeavingArray: leaving })
  }

  render () {
    console.log(JSON.stringify(this.state.moveArray))
    return (
      <div className='board'>
        {this.state.board.map((row, i) => (
            <div className='seed-row' key={i}>
              {row.map((tile, j) => {
                const tileType = this.tileType(tile)
                return (tile > -1)
                ? <Seed
                    tileType={tileType}
                    startDrag={this.startDrag}
                    checkTile={this.checkTile}
                    isLeavingBool={(this.state.isLeavingArray[i][j]) ? 'leaving' : ''}
                    isFallingBool={(this.state.isFallingArray[i][j]) ? 'falling' : ''}
                    y={i}
                    x={j}/> : ''
              }
              )}
            </div>
          )
        )}
      </div>
    )
  }
}
