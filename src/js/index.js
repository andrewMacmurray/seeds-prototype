import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import throttle from 'lodash/throttle'
import { saveState, loadState } from './serialiseState.js'
import { merge, pick } from 'ramda'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import loggerSettings from './redux/loggerSettings.js'
import defaultState from './initialState.js'
import levelSettings from './levelSettings.js'
import reducers from './redux/rootReducer.js'
import App from './components/App.js'

const initialState = merge(defaultState, loadState())

const logger = createLogger(loggerSettings)
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunk.withExtraArgument(levelSettings),
    logger
  )
)

store.subscribe(throttle(() => {
  saveState({
    level: pick([ 'levelProgress', 'currentLevel' ], store.getState().level)
  })
}, 5000))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
