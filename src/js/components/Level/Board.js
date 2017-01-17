import React from 'react'
import { addListener, removeListener } from 'spur-events'
import { connect } from 'react-redux'
import tileClassMap from '../../constants/tileClasses.js'
import Tile from './Tile.js'

class Board extends React.PureComponent {

  componentDidMount () {
    addListener(window, 'pointerup', this.stopSequence)
    setTimeout(this.props.resetEntering, 600)
  }

  componentWillUnmount () {
    removeListener(window, 'pointerup', this.stopSequence)
  }

  getCoord = (e) => {
    const x = parseInt(e.target.getAttribute('data-x'))
    const y = parseInt(e.target.getAttribute('data-y'))
    return [ y, x ]
  }

  getTileAndType (e) {
    return [ this.getCoord(e), this.props.moveType ]
  }

  startDrag = (e) => {
    const [ tile, moveType ] = this.getTileAndType(e)
    this.props.startDrag(tile, moveType)
  }

  checkTile = (tile) => {
    this.props.checkTile(tile, this.props.moveType)
  }

  stopSequence = () => {
    const { moveType, seedPodCount } = this.props
    this.props.stopDrag(moveType, seedPodCount)
  }

  triggerWeather = (weatherType) => {
    const { seedPodCount } = this.props
    this.props.triggerWeather(weatherType, seedPodCount)
  }

  harvestSeeds = () => {
    const { seedMoves } = this.props
    this.props.harvestSeeds(seedMoves)
  }

  fallingMagnitudeClass = (tile) => {
    return tile ? `falling-${tile}` : ''
  }

  render () {
    const {
      isLeavingArray,
      isDraggingArray,
      fallingMagnitudeArray,
      isEnteringArray,
      isGrowingArray,
      movesOrderArray,
      growingOrderArray,
      seedType,
      board: { tiles, boardSize },
      weather: { animating, remainingWeatherTurns, overrideWeatherPower }
    } = this.props

    return (
      <div className={'board-x' + boardSize + ' ' + seedType}>
          {tiles.map((row, i) =>
              row.map((tile, j) => {
                const tileType = tileClassMap[tile]
                return tile > 0
                  ? <Tile
                    tileType={tileType}
                    seedType={seedType}
                    weatherAnimating={animating}
                    startDrag={this.startDrag}
                    checkTile={this.checkTile}
                    key={'tile-' + i + '-' + j}
                    remainingWeatherTurns={remainingWeatherTurns}
                    overrideWeatherPower={overrideWeatherPower}
                    moveOrder={movesOrderArray[i][j] ? `delay-${movesOrderArray[i][j]}` : ''}
                    growingOrder={growingOrderArray[i][j] ? `delay-${growingOrderArray[i][j]}` : ''}
                    isLeaving={isLeavingArray[i][j] ? 'leaving' : ''}
                    isDragging={isDraggingArray[i][j] ? 'dragging' : ''}
                    isEntering={isEnteringArray[i][j] ? 'entering' : ''}
                    isGrowing={isGrowingArray[i][j]}
                    isFalling={this.fallingMagnitudeClass(fallingMagnitudeArray[i][j])}
                    y={i}
                    x={j}
                    /> : ''
              }
            )
          )
        }
      </div>
    )
  }
}

import isDraggingArray from '../../redux/selectors/level/selector_isDraggingArray.js'
import isGrowingArray from '../../redux/selectors/level/selector_isGrowingArray.js'
import moveType from '../../redux/selectors/level/selector_moveType.js'
import seedMoves from '../../redux/selectors/level/selector_seedMoves.js'
import seedPodCount from '../../redux/selectors/level/selector_seedPodCount.js'
import { movesOrder, growingOrder } from '../../redux/selectors/level/selector_movesOrder.js'

const mapStateToProps = (state) => ({
  ...state.level,
  isDraggingArray: isDraggingArray(state),
  isGrowingArray: isGrowingArray(state),
  moveType: moveType(state),
  seedMoves: seedMoves(state),
  seedPodCount: seedPodCount(state),
  movesOrderArray: movesOrder(state),
  growingOrderArray: growingOrder(state)
})

import stopDrag from '../../redux/actionSequences/level/stopDrag.js'
import startDrag from '../../redux/actionSequences/level/startDrag.js'
import checkTile from '../../redux/actionSequences/level/checkTile.js'
import { resetEntering } from '../../redux/allActions.js'

export default connect(mapStateToProps, {
  resetEntering,
  stopDrag,
  startDrag,
  checkTile
})(Board)
