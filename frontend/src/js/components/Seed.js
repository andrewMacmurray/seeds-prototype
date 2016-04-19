import React from 'react'

export default (props) => (
  <div
    className={props.tileType + ' tile ' + props.isLeavingBool}
    id={props.id}
    onMouseDown={props.startDrag}
    onMouseEnter={props.checkTile}
    draggable={false}
    data-x={props.x}
    data-y={props.y}>
  </div>
)
