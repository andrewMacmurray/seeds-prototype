import React from 'react'
import Next from './components/Next.js'
import TextContainer from './components/TextContainer.js'
import TutorialBoard from './components/TutorialBoard.js'
import Lines from './components/Lines.js'

const textContent = [
  { text: 'These are seed pods',
    visibleAt: [ 3, 4 ]
  },
  { text: 'They are almost ready to bear seeds',
    visibleAt: [ 6 ]
  },
  { text: 'Connect them to release the seeds',
    visibleAt: [ 8, 9 ]
  },
  { text: 'Brilliant!',
    visibleAt: [ 10, 11 ]
  }
]

export default class Step3 extends React.PureComponent {

  componentDidMount () {
    this.props.checkBoardComplete({
      boardType: 'seedlingBoardComplete',
      renderStep: 3,
      completeStep: 9
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
          visibleAt={[ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
          enabledAt={[ 8, 9 ]}
          {...this.props}
        />
        <Next
          visibleAt={[ 4, 5, 6, 7, 8 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
