import { all } from 'redux-saga/effects';
import authSaga from '@domains/auth/redux/authSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
