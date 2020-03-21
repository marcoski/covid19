import C from '../constants'
import { take, call, put } from 'redux-saga/effects'
import { api } from '../../utils/api'

function* appData() {
  const { data: lastUpdate } = yield call(api.get, '/api/last-update')
  yield put({ type: C.APP.LAST_UPDATE, lastUpdate })
  const regions = yield call(api.get, '/api/geo/regioni')
  yield put({ type: C.APP.REGIONS, regions })
}

function* changeCurrentView({ view }) {
  yield put({ type: C.APP.CURRENT_VIEW, currentView: view })
}

function* changeCurrentAggregate({ aggregate }) {
  yield put({ type: C.APP.CURRENT_AGGREGATE, currentAggregate: aggregate })
}

function* clearCurrentAggregate() {
  yield put({ type: C.APP.CURRENT_AGGREGATE, currentAggregate: '' })
}

function* changeFilters({ filters }) {
  yield put({ type: C.APP.CHANGE_FILTERS, filters })
}

export function* watcher() {
  while (true) {
    yield take('GET_APP_DATA_MSG')
    yield call(appData)
  }
}

export const extraWatchers = [
  function *watchChangeView() {
    while (true) {
      const action = yield take('CHANGE_VIEW_MSG')
      yield call(changeCurrentView, action)
    }
  },
  function *watchChangeAggregate() {
    while(true) {
      const action = yield take('CHANGE_CURRENT_AGGREGATE_MSG')
      yield call(changeCurrentAggregate, action)
    }
  },
  function *watchClearAggregate() {
    while(true) {
      yield take('CLEAR_CURRENT_AGGREGATE_MSG')
      yield call(clearCurrentAggregate)
    }
  },
  function *watchChangeFilters() {
    while(true) {
      const action = yield take('CHANGE_FILTERS_MSG')
      yield call(changeFilters, action)
    }
  }
]
