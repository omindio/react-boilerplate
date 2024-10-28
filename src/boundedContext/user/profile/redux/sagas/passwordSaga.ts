import { call, put, takeLatest } from 'redux-saga/effects';
import {
  passwordRequest,
  passwordSuccess,
  passwordFailure,
} from '../reducers/passwordSlice';
import { updatePassword as updatePasswordApi } from '../../api/passwordApi';

function* updatePassword(
  action: ReturnType<typeof passwordRequest>
): Generator<any, void> {
  try {
    const response = yield call(updatePasswordApi, action.payload);
    yield put(passwordSuccess(response.data));
  } catch (error: any) {
    yield put(passwordFailure(error.response?.data));
  }
}

export default function* passwordSaga() {
  yield takeLatest(passwordRequest.type, updatePassword);
}
