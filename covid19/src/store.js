import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { request, i18n } from './utils/reducers'
import reducers from './store/reducers'
import rootSaga from './rootSaga'

const saga = createSagaMiddleware()
const middlewares = [logger, saga]

export const configStore = (initialState = {}) => {
  const store = createStore(
    combineReducers({ request, i18n, ...reducers }),
    initialState,
    applyMiddleware(...middlewares)
  )

  saga.run(rootSaga)
  return store
}