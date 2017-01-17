import React from 'react'
import Lines from './components/Lines.js'
import Next from './components/Next.js'
import TextContainer from './components/TextContainer.js'
import { auto, delay } from '../../constants/tutorialDefaults.js'


const textContent = [
  { text: 'You have embarked on a journey',
    visibleAt: [ 1, 2 ]
  },
  { text: 'Across meadows, and mountains',
    visibleAt: [ 2 ]
  },
  { text: 'To find the seeds of our dying world',
    visibleAt: [ 4, 5 ]
  },
  { text: 'And build a seed bank for our new world',
    visibleAt: [ 5]
  }
]

export const sequence2 = {
  subSteps: [
    { delay },
    { delay, auto },
    { delay: 600, auto },
    { delay },
    { delay, auto },
    { delay }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Lines
        textContent={textContent}
        {...props}
      />
      <Next
        visibleAt={[ 1, 2, 3, 4, 5, 6 ]}
        {...props}
      />
    </TextContainer>
  )
}
