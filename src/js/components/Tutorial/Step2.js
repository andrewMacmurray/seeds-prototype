import React from 'react'
import Line from './Line.js'
import Next from './Next.js'
import TextContainer from './TextContainer.js'

const textContent = [
  { text: 'You have embarked on a journey',
    visibleAt: [ 1, 2 ]
  },
  { text: 'Across mountains, deserts, meadows and forests',
    visibleAt: [ 2 ]
  },
  { text: 'To find the seeds of our dying world',
    visibleAt: [ 4, 5 ]
  },
  { text: 'And assemble a great seed bank for our new world',
    visibleAt: [ 5]
  }
]

export default (props) => {
  return (
    <TextContainer {...props}>
      {textContent.map((settings, i) =>
        <Line key={i} {...settings} {...props} />
      )}
      <Next
        visibleAt={[ 1, 2, 3, 4, 5, 6 ]}
        {...props}
      />
    </TextContainer>
  )
}
