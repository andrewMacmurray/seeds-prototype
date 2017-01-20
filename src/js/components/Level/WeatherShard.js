import React from 'react'
import classnames from 'classnames'

const activeAt = (percent, currentPower, weatherVisible, override) =>
  currentPower >= percent || weatherVisible && !override
    ? 'active'
    : 'inactive'

export default (props) => {
  const {
    weatherVisible,
    power,
    threshold,
    overridePower
  } = props
  const percentPower = power / threshold
  const activeSphere = weatherVisible && !overridePower
    ? 'active'
    : ''

  const enableShake = percentPower >= 0.8
    ? 'shake'
    : ''

  const mainClasses = classnames(
    'weather-shard',
    'weather-shard-' + props.type,
    enableShake
  )

  const shardClasses = (shardNumber, requiredPower) => classnames(
    'shard',
    'shard-' + shardNumber,
    activeAt(
      requiredPower,
      percentPower,
      weatherVisible,
      overridePower
    )
  )

  return (
    <div className={mainClasses}>
      <div className={'power-sphere ' + activeSphere} />
      <svg viewBox='78.4 -15.7 76.8 107' xmlns='http://www.w3.org/2000/svg'>
        <path
          className={shardClasses(4, 0.8)}
          fill='#CFCFCF'
          d='M102.4 20.3l-24-5 13.4 22 10.6-17zM141.8 37.4L132 53.7l-.2.6 23.4 4.7z'
        />
        <path
          className={shardClasses(3, 0.5)}
          fill='#AFAFAF'
          d='M131.2 20.3l-6.6 16 7.4 17.4 9.8-16.3 13.4-22zM103 53.8l7.3-16.7-8-16.7-10.5 17L78.4 59l24.8-5z'
        />
        <path
          className={shardClasses(2, 0.3)}
          fill='#EDEDEE'
          d='M132 53.7l-.2.3h-1.6l1.6.3.2-.5zM103.2 54h.2z'
        />
        <path
          className={shardClasses(2, 0.3)}
          fill='#EDEDEE'
          d='M131.8 54l.2-.3-7.4-17.5-7 16.6-7.3-15.7L103 54l.2.2h.2-.2l15.4 37.3 13.2-37-1.6-.3z'
        />
        <path
          className={shardClasses(1, 0.1)}
          fill='#DDD'
          d='M117.7-15.7l-15.3 36 8 16.8 7.3 15.8 7-16.6 6.5-16z'
        />
      </svg>
    </div>
  )
}
