import * as _ from '../../allActions.js'

export default (tutorialData) => (dispatch) => {
  dispatch(_.setTutorialData(tutorialData))
  dispatch(_.resetTutorialStep())
  dispatch(_.resetTutorialSubStep())
  dispatch(_.overrideWeatherPower(true))
}
