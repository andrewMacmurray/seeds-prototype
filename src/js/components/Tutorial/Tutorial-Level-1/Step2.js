import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'


const textContent = [
  { text: 'You have embarked on a journey',
    visibleAt: [ 2, 3 ]
  },
  { text: 'Across meadows, and mountains',
    className: 'plus-2-0',
    visibleAt: [ 3 ]
  },
  { text: 'To find seeds across our world',
    className: 'plus-2-0',
    visibleAt: [ 5, 6, 7 ]
  },
  { text: 'And assemble a great seed bank,',
    className: 'plus-4-0',
    visibleAt: [ 6, 7 ]
  },
  { text: 'for our new one',
    className: 'plus-6-0',
    visibleAt: [ 7 ]
  }
]

export const sequence2 = {
  substeps: [
    { delay: 600, auto },
    { delay, auto },
    { delay },
    { delay: 600, auto },
    { delay: 600, auto },
    { delay, auto },
    { delay },
    { delay, auto }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Lines
        textContent={textContent}
        sameLine
        {...props}
      />
      <Next
        visibleAt={[ 1, 2, 3, 4, 5, 6, 7, 8 ]}
        {...props}
      />
    </TextContainer>
  )
}
