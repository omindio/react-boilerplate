import { all } from 'redux-saga/effects';
import authSaga from 'src/boundedContext/auth/redux/sagas/authSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
