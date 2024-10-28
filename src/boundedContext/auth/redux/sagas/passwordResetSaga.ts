import { call, put, takeLatest } from 'redux-saga/effects';
import {
  passwordResetRequest,
  passwordResetSuccess,
  passwordResetFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../reducers/passwordResetSlice';
import {
  requestPasswordReset as requestPasswordResetApi,
  passwordReset as passwordResetApi,
} from '../../api/passwordResetApi';

function* passwordReset(
  action: ReturnType<typeof passwordResetRequest>
): Generator<any, void> {
  try {
    const response = yield call(requestPasswordResetApi, action.payload);
    yield put(passwordResetSuccess(response.data));
  } catch (error: any) {
    yield put(passwordResetFailure(error.response?.data));
  }
}

function* resetPassword(
  action: ReturnType<typeof resetPasswordRequest>
): Generator<any, void> {
  try {
    const response = yield call(passwordResetApi, action.payload);
    yield put(resetPasswordSuccess(response.data));
  } catch (error: any) {
    yield put(resetPasswordFailure(error.response?.data));
  }
}

export default function* passwordResetSaga() {
  yield takeLatest(passwordResetRequest.type, passwordReset);
  yield takeLatest(resetPasswordRequest.type, resetPassword);
}
