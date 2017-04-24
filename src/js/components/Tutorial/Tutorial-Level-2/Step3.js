import React from 'react'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

export const sequence3 = {
  substeps: [
    { delay, auto },
    { delay, auto }
  ],
  weather: { action: 'reset', substep: 1 }
}

export default () => <span></span>
