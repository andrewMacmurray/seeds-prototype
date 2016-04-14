import React from 'react'
import { validMove, randomBoard } from '../helpers/model.js'

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      board: randomBoard(),
      currTile: [],
      moveArray: [],
      isDragging: false
    }
    this.tileType = this.tileType.bind(this)
    this.generateSeed = this.generateSeed.bind(this)
    this.checkTile = this.checkTile.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
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

  startDrag (e) {
    const x = parseInt(e.target.getAttribute('data-x'), 10)
    const y = parseInt(e.target.getAttribute('data-y'), 10)
    const tile = [y, x]
    this.setState({
      isDragging: true,
      currTile: this.state.currTile.concat(tile),
      moveArray: this.state.moveArray.concat([tile])
    })
  }

  checkTile (e) {
    if (this.state.isDragging) {
      const x = parseInt(e.target.getAttribute('data-x'), 10)
      const y = parseInt(e.target.getAttribute('data-y'), 10)
      const tile = [y, x]
      if (validMove(tile, this.state.currTile, this.state.board)) {
        this.setState({
          currTile: tile,
          moveArray: this.state.moveArray.concat([tile])
        })
      }
    }
  }

  removeTiles () {
    // const newBoard = this.state.board.map((row, i) => {
    //   return row.map((tile, j) => {
    //     let val = tile
    //     this.state.moveArray.forEach(([y, x]) => {
    //       if (x === i && j === y) val = 0
    //     })
    //     return val
    //   })
    // })
    // // console.log(JSON.stringify(newBoard))
    // this.setState({
    //   board: newBoard
    // })
  }

  tileType (num) {
    if (num === 1) return 'sun'
    else if (num === 2) return 'rain'
    else if (num === 3) return 'seedling'
    else return 'pod'
  }

  generateSeed (tile, x, y) {
    const tileType = this.tileType(tile)
    return (
      <div
      id={tileType}
      className={tileType + ' tile'}
      onMouseDown={this.startDrag}
      onMouseEnter={this.checkTile}
      draggable={false}
      key={'tile-' + x + '-' + y}
      data-x={x}
      data-y={y}>
    </div>
    )
  }

  render () {
    console.log(JSON.stringify(this.state.moveArray))
    return (
      <div className='board'>
        {this.state.board.map((row, i) => (
            <div className='seed-row' key={i}>
              {row.map((tile, j) => (tile > 0) ? this.generateSeed(tile, i, j) : '')}
            </div>
          )
        )}
      </div>
    )
  }
}
