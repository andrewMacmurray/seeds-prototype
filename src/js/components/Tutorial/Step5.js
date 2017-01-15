import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Next from './components/Next.js'
import Lines from './components/Lines.js'

const textContent = [
  { text: 'Now connect seeds to fill the seed bank',
    visibleAt: [ 1, 2 ]
  },
  { text: 'Connect as many as you can in one move',
    visibleAt: [ 4 ]
  },
  { text: 'Marvellous!',
    visibleAt: [ 5 ]
  },
  { text: 'The more seeds you connect,\n the faster the seed bank will fill up',
    className: 'minus-1-half',
    visibleAt: [ 7 ]
  },
  { text: 'Your first journey awaits...',
    className: 'plus-1-half',
    visibleAt: [ 9, 10 ]
  }
]

export default class Step5 extends React.PureComponent {

  componentDidMount () {
    this.props.checkBoardComplete({
      boardType: 'seedBoardComplete',
      renderStep: 5,
      completeStep: 4
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
          visibleAt={[ 1, 2, 3, 4, 5, 6, 7 ]}
          enabledAt={[ 2, 3, 4 ]}
          {...this.props}
        />
        <Next
          text='begin'
          visibleAt={[ 10 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
