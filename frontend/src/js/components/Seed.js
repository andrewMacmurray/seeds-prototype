import React from 'react'

export default (props) => (
  <div
    className={props.tileType + ' tile'}
    id={props.id}
    onMouseDown={props.startDrag}
    onMouseEnter={props.checkTile}
    draggable={false}
    key={'tile-' + props.x + '-' + props.y}
    data-x={props.x}
    data-y={props.y}>
  </div>
)
