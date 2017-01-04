import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import loggerSettings from './loggerSettings.js'
import { merge, pick } from 'ramda'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './serialiseState.js'
import defaultState from '../initialState.js'
import levelSettings from '../levelSettings.js'
import reducers from './rootReducer.js'

const initialState = merge(defaultState, loadState())
const logger = createLogger(loggerSettings)

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunk.withExtraArgument(levelSettings),
    logger
  )
)

export const localStorageSubscribe = () =>
  store.subscribe(
    throttle(() => {
      saveState({
        level: pick([
          'levelProgress',
          'currentLevel'
        ], store.getState().level)
      })
    }, 5000))
