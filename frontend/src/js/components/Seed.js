import React from 'react'

export default (props) => (
  <div
    className={props.tileType + ' tile ' + props.isLeavingBool}
    id={props.tileType}
    key={'tile-' + props.x + '-' + props.y}
    onMouseDown={props.startDrag}
    onMouseEnter={props.checkTile}
    draggable={false}
    key={'tile-' + props.x + '-' + props.y}
    data-x={props.x}
    data-y={props.y}>
  </div>
)
