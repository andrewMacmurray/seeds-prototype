import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Lines from './components/Lines.js'

const textContent = [
  { text: 'Connect across or diagonally',
    visibleAt: [ 3 ]
  },
  { text: 'Wonderful!',
    visibleAt: [ 4 ]
  }
]

export default class Step4 extends React.PureComponent {

  componentDidMount () {
    this.props.checkBoardComplete({
      boardType: 'seedlingBoardComplete',
      renderStep: 4,
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
