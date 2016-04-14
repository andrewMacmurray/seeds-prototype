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

  startDrag () {
    this.setState({ isDragging: true })
    this.checkTile()
  }

  stopDrag () {
    this.setState({ isDragging: false })
  }

  checkTile (e) {
    if (this.state.isDragging) {
      console.log('checking tile')
      const x = parseInt(e.target.getAttribute('data-x'), 10)
      const y = parseInt(e.target.getAttribute('data-y'), 10)
      const tile = [x, y]
      if (this.state.currTile.length === 0) {
        this.setState({
          currTile: this.state.currTile.concat(tile),
          moveArray: this.state.moveArray.concat([tile])
        })
      } else if (validMove(tile, this.state.currTile, this.state.board)) {
        this.setState({
          currTile: tile,
          moveArray: this.state.moveArray.concat([tile])
        })
      }
    }
  }

  tileType (num) {
    if (num === 0) return 'sun'
    else if (num === 1) return 'rain'
    else if (num === 2) return 'seedling'
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
        { this.state.board.map((row, i) => (
            <div className='seed-row' key={i}>
              { row.map((tile, j) => this.generateSeed(tile, i, j)) }
            </div>
          )
        ) }
      </div>
    )
  }
}
