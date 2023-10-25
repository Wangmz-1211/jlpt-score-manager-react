import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxPromise from 'redux-promise'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(reduxLogger, reduxPromise))

export default store
