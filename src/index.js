import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createStore from './store/createStore'
import App from './components/App'
import getAllBuckets from './store/buckets/actions/getAllBuckets'

const store = createStore()

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
)

store.dispatch(getAllBuckets())
