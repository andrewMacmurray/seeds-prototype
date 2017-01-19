import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Next from './components/Next.js'
import Lines from './components/Lines.js'
import { auto, delay } from '../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Now connect seeds to fill the seed bank',
    className: 'minus-1-half',
    visibleAt: [ 1, 2 ]
  },
  { text: 'Connect as many as you can in one move',
    className: 'plus-half',
    visibleAt: [ 2 ]
  },
  { text: 'Marvellous!',
    className: 'minus-1-half',
    visibleAt: [ 3 ]
  },
  { text: 'The more seeds you connect,\n the faster the seed bank will fill up',
    className: 'minus-1-half',
    visibleAt: [ 5 ]
  },
  { text: 'Your first journey awaits...',
    className: 'minus-1-half',
    visibleAt: [ 7, 8, 9 ]
  },
  { text: 'quickly, grow and collect the seeds\n whilst it\'s still raining',
    className: 'plus-1-half',
    visibleAt: [ 8, 9 ]
  }
]

export const sequence5 = {
  substeps: [
    { delay, auto },
    { delay: 2000 },
    { delay, auto },
    { delay: 2000, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay: 100 },
    { delay: 100, auto }
  ]
}

export default class Step5 extends React.PureComponent {

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
          visibleAt={[ 1, 2, 3, 4, 5 ]}
          enabledAt={[ 2 ]}
          {...this.props}
        />
        <Next
          text='begin'
          visibleAt={[ 9 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
