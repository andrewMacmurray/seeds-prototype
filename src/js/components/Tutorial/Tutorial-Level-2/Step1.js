import React from 'react'
import Lines from '../Components/Lines.js'
import TextContainer from '../Components/TextContainer.js'
import Wrapper from '../Components/Wrapper.js'
import WeatherShard from '../../Level/WeatherShard.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Collect rain energy to power the weather',
    className: 'plus-3-5',
    visibleAt: [ 3 ]
  }
]

export const sequence1 = {
  substeps: [
    { delay: 2000 },
    { delay: 3000, auto },
    { delay, auto }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Wrapper
        visibleAt={[ 2, 3 ]}
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
    </TextContainer>
  )
}
