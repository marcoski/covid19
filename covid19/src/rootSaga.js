import { all, spawn, call } from 'redux-saga/effects'
import sagas from './store/sagas'

export default function* saga() {
  const rootSagas = sagas.reduce((acc, saga) => {
    if(typeof saga === 'function') return [...acc, ...[saga]]
    return [
      ...acc, 
      ...(saga.saga ? [saga.saga] : []), 
      ...(saga.watcher ? [saga.watcher] : []),
      ...(saga.extraWatchers ? saga.extraWatchers : [])
    ]
  }, [])
  yield all(rootSagas.map(saga => spawn(function* () {
    while(true) {
      try {
        yield call(saga)
        break;
      } catch(e) {
        console.error(e) 
      }
    }
  })))
}