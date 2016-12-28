import React from 'react'
import { connect } from 'react-redux'
import Step1 from './Step1.js'
import Step2 from './Step2.js'
import Step3 from './Step3.js'
import Step4 from './Step4.js'
import Step5 from './Step5.js'
import handleNextTutorialStep from '../../redux/actionSequences/tutorial/handleNextTutorialStep.js'

class Tutorial extends React.PureComponent {

  componentDidMount () {
    setTimeout(this.props.handleNextTutorialStep, 500)
  }

  render () {
    return (
      <div>
        <div className='tutorial-container'>
          <Step2 {...this.props} />
          <Step1 {...this.props} />
          <Step3 {...this.props} />
          <Step4 {...this.props} />
          <Step5 {...this.props} />
        </div>
      </div>
    )
  }

}

import {
  podBoardComplete,
  seedlingBoardComplete
} from '../../redux/selectors/tutorial/selector_tutorialBoardComplete.js'

const mapStateToProps = (state) => ({
  ...state.tutorial,
  seedlingBoardComplete: seedlingBoardComplete(state),
  podBoardComplete: podBoardComplete(state)
})

export default connect(mapStateToProps, { handleNextTutorialStep })(Tutorial)
