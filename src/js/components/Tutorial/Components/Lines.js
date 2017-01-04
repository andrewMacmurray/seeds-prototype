import React from 'react'
import Line from './Line.js'

export default (props) =>
  <div>
    {props.textContent.map(({ text, visibleAt }, i) =>
      <Line
        key={i}
        className={props.className}
        text={text}
        visibleAt={visibleAt}
        {...props}
      />
    )}
  </div>
