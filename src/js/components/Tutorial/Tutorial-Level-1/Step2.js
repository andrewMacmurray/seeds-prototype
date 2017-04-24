import React from 'react'
import TutorialBoard from '../Components/TutorialBoard.js'
import TextContainer from '../Components/TextContainer.js'
import Lines from '../Components/Lines.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Collect seeds to fill the seed-bank',
    visibleAt: [ 2 ]
  },
  { text: 'Marvellous',
    visibleAt: [ 3, 4 ]
  },
  { text: 'Your first journey awaits',
    visibleAt: [ 6, 7 ]
  }
]

export const sequence2 = {
  substeps: [
    { delay: 1000, auto },
    { delay },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay: 1500, auto },
    { delay, auto },
    { delay, auto },
  ],
  weather: { action: 'stop', type: 'rain', substep: 1 }
}

export default class Step2 extends React.PureComponent {

  componentDidMount () {
    const { renderStep, checkBoardComplete } = this.props
    checkBoardComplete({
      boardType: 'seedBoardComplete',
      renderStep,
      completeStep: 2
    })
  }

  render () {
    return (
      <TextContainer {...this.props}>
        <Lines
          textContent={textContent}
          sameLine
          {...this.props}
        />
        <TutorialBoard
          seedDirection='top'
          visibleAt={[ 1, 2, 3, 4, 5, 6, 7 ]}
          enabledAt={[ 2 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
