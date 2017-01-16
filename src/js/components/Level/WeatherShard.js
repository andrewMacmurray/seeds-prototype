import React from 'react'

const activeAt = (percent, currentPower, weatherVisible) =>
  currentPower >= percent || weatherVisible
    ? 'active'
    : ''

export default (props) => {
  const { weatherVisible, power, threshold } = props
  const percentPower = power / threshold

  return (
    <svg
      className={'weather-shard weather-shard-' + props.type}
      width='82' height='108' viewBox='0 0 82 108'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={'shard shard-1 ' + activeAt(0.1, percentPower, weatherVisible)}
        fill='#CFCFCF' d='M82 79.5L30.8 63.8l-20-40.4 51.3 15.8'
      />
      <path
        className={'shard shard-2 ' + activeAt(0.3, percentPower, weatherVisible)}
        fill='#AFAFAF' d='M.5 79.6L33 37.2l45-4.6L45.2 75'
      />
      <path
        className={'shard shard-3 ' + activeAt(0.5, percentPower, weatherVisible)}
        fill='#EDEDEE' d='M43 108L29.4 66.4l15.5-34 13.5 41.6'
      />
      <path
        className={'shard shard-4 ' + activeAt(0.8, percentPower, weatherVisible)}
        fill='#DDD' d='M45 79.5L27.6 40 45 0 62.5 40'
      />
    </svg>
  )
}
