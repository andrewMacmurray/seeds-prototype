import React from 'react'
import SeedBankSvg from './SeedBankSvg.js'

export default (props) => {
  const { currentScore, levelGoal } = props
  const percentComplete = currentScore / levelGoal
  return (
    <div className='seed-bank'>
      <img className='outline' src='img/outlines/teardrop-seed-outline-2.svg' />
      <SeedBankSvg percentComplete={percentComplete} />
    </div>
  )
}
