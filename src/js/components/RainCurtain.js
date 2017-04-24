import { times } from 'ramda'
import React from 'react'
import cx from 'classnames'

export default (props) => {

  const rainClasses = cx(
    'rain-curtain',
    { hidden: !props.raindropsVisible },
    { 'opacity-25': props.overridePower }
  )

  return (
    <div className={rainClasses}>
      {times((i) => <div key={i} className='rain-drop' />, 16)}
    </div>
  )
}
