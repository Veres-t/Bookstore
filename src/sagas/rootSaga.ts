import { all } from 'redux-saga/effects';
import { booksSaga } from './booksSaga';
import { cartSaga } from './cartSaga';
import { userSaga } from './userSaga';


export default function* rootSaga() {
yield all([
booksSaga(),
cartSaga(),
userSaga(),
]);
}