import React from 'react'
import { connect } from 'react-redux'
import Step1 from './Step1.js'
import Step2 from './Step2.js'
import Step3 from './Step3.js'
import handleNextTutorialStep from '../../redux/actionSequences/tutorial/handleNextTutorialStep.js'

class Tutorial extends React.PureComponent {

  componentDidMount () {
    setTimeout(this.props.handleNextTutorialStep, 500)
    this.checkStep3()
  }

  checkStep3 = () => {
    const { boardComplete } = this.props
    setTimeout(() =>
      boardComplete
        ? this.props.handleNextTutorialStep()
        : this.checkStep3()
    , 300)
  }

  render () {
    return (
      <div>
        <div className='tutorial-container'>
          <Step2 {...this.props} />
          <Step1 {...this.props} />
          <Step3 {...this.props} />
        </div>
      </div>
    )
  }

}

import tutorialBoardComplete from '../../redux/selectors/tutorial/selector_tutorialBoardComplete.js'

const mapStateToProps = (state) => ({
  ...state.tutorial,
  boardComplete: tutorialBoardComplete(state)
})

export default connect(mapStateToProps, { handleNextTutorialStep })(Tutorial)
