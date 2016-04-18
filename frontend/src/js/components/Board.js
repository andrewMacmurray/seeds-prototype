import React from 'react'
import { validMove, randomBoard, roundRandom, shiftBoard, isLeavingArray } from '../helpers/model.js'
import Seed from './Seed.js'

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      board: randomBoard(),
      isLeavingArray: isLeavingArray(),
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

  removeTiles () {
    const zeroBoard = this.state.board.map((row, i) => {
      return row.map((tile, j) => {
        let val = tile
        this.state.moveArray.forEach(([y, x]) => {
          if (y === i && j === x) val = 0
        })
        return val
      })
    })
    this.isLeaving()
    // this.setState({ board: zeroBoard })
    // setTimeout(this.shiftTiles, 500)
    // setTimeout(this.addNewTiles, 1000)
  }

  shiftTiles () {
    const minusOneBoard = this.state.board.map(row =>
      row.map(tile =>
        tile === 0 ? -1 : tile
    ))
    this.setState({ board: shiftBoard(minusOneBoard) })
  }

  addNewTiles () {
    const newBoard = this.state.board.map(row => {
      return row.map(tile => {
        const n = roundRandom()
        return (tile === -1) ? n : tile
      })
    })
    this.setState({ board: newBoard })
  }

  tileType (num) {
    if (num === 1) return 'sun'
    else if (num === 2) return 'rain'
    else if (num === 3) return 'seedling'
    else if (num === 4) return 'pod'
  }

  isLeaving (num) {
    const leaving = this.state.isLeavingArray.map((row, i) =>
      row.map((tile, j) => {
        let val = false
        this.state.moveArray.forEach(([y, x]) => {
          if (y === i && j === x) val = true
        })
        return val
      }))
    // console.log(JSON.stringify(leaving))
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
                return (tile > -1) ?
                  <Seed
                    tileType={tileType}
                    startDrag={this.startDrag}
                    checkTile={this.checkTile}
                    isLeavingBool={(this.state.isLeavingArray[i][j]) ? 'leaving' : ''}
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
