import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Lines from './components/Lines.js'
import { all } from '../../constants/probabilities.js'
import { auto, delay } from '../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Connect across or diagonally',
    visibleAt: [ 3 ]
  },
  { text: 'Wonderful!',
    visibleAt: [ 4 ]
  }
]

export const sequence4 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay },
    { delay, auto },
    { delay, auto }
  ],
  board: { size: 3, probabilities: all.seedPods, substep: 1 },
  weather: { type: 'rain', action: 'stop', substep: 4 }
}

export default class Step4 extends React.PureComponent {

  componentDidMount () {
    const { checkBoardComplete, renderStep } = this.props
    checkBoardComplete({
      boardType: 'seedPodBoardComplete',
      renderStep,
      completeStep: 3
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
          visibleAt={[ 2, 3, 4, 5 ]}
          enabledAt={[ 3 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
