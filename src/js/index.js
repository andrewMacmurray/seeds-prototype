import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, localStorageSubscribe } from './redux/store.js'
import App from './components/App.js'

localStorageSubscribe()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
