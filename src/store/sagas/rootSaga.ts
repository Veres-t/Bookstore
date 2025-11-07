// store/sagas/rootSaga.ts
import { all } from 'redux-saga/effects';
import { watchBooksSaga } from './booksSaga';
import { watchAuthSaga } from './authSaga';

export default function* rootSaga() {
  yield all([
    watchBooksSaga(),
    watchAuthSaga(),
  ]);
}