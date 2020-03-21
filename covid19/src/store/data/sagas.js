import C from '../constants'
import { api } from '../../utils/api'
import { take, call, put } from 'redux-saga/effects'

function *readDataByDate({ view }) {
  const data = yield call(api.get, `/api/${view}/by-date`)
  yield put({ type: C.DATA.READ_BY_DATE, data })
}

function *readDataByAggregate({ view }) {
  let endpoint = ''
  if(view === 'italia') {
    endpoint = '/api/regioni/by-date'
  }
  if(view === 'regioni') {
    endpoint = '/api/province/by-regione'
  }
  if(view === 'province') {
    endpoint = '/api/province/by-provincia'
  }
  const data = yield call(api.get, endpoint)
  yield put({ type: C.DATA.READ_BY_AGGREGATE, data })
}

function *clearData() {
  yield put({ type: C.DATA.CLEAR })
}

export function *watcher() {
  while(true) {
    const action = yield take('GET_DATA_MSG')
    yield call(readDataByDate, action)
    yield call(readDataByAggregate, action)
    yield take('CLEAR_DATA_MSG')
    yield call(clearData)
  }
}