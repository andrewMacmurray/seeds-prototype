import React from 'react'
import classnames from 'classnames'

export default (props) => {

  const sunClasses = classnames(
    'sun-sphere',
    { hidden: !props.sunSphereVisible },
    { active: props.sunSphereVisible }
  )

  return (
    <div className='sun-sphere-container'>
      <div className={sunClasses} />
    </div>
  )
}
