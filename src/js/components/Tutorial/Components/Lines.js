import React from 'react'
import Line from './Line.js'

export default (props) =>
  <div>
    {props.textContent.map(({ text, visibleAt, className }, i) =>
      <Line
        key={i}
        className={className}
        text={text}
        visibleAt={visibleAt}
        {...props}
      />
    )}
  </div>
