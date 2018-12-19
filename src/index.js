import 'font-awesome/css/font-awesome.css'
import './less/styles.less'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store/createStore'
import AppContainer from './components/AppContainer'

const store = createStore()

render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('main')
)
