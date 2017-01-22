import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import Wrapper from '../Components/Wrapper.js'
import WeatherShard from '../../Level/WeatherShard.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'This is a weather shard',
    className: 'plus-3-5',
    visibleAt: [ 2, 3 ]
  },
  { text: 'A fragment sent from the heavens,\n with the power to control the weather',
    className: 'plus-3-5',
    visibleAt: [ 5 ]
  },
  { text: 'This shard lies dormant',
    className: 'plus-3-5',
    visibleAt: [ 7, 8 ]
  },
  { text: 'Reawaken it by collecting weather spheres',
    className: 'plus-5-5',
    visibleAt: [ 8 ]
  }
]

export const sequence2 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay },
    { delay: 2000, auto },
    { delay, auto },
    { delay: 1500, auto },
    { delay, auto },
    { delay }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Wrapper
        visibleAt={[ 1, 2, 3, 4, 5, 6, 7, 8 ]}
        className='transition-500 minus-2-0-margin'
        {...props}
      >
        <WeatherShard type='rain dormant w50' power={0} threshold={12} />
      </Wrapper>
      <Lines
        textContent={textContent}
        sameLine
        {...props}
      />
      <Next
        visibleAt={[ 3, 4, 5, 6, 7, 8 ]}
        {...props}
      />
    </TextContainer>
  )
}
