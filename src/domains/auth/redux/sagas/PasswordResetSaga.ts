import { call, put, takeLatest } from 'redux-saga/effects';
import {
  passwordResetRequest,
  passwordResetSuccess,
  passwordResetFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../reducers/PasswordResetSlice';
import {
  passwordReset as passwordResetApi,
  resetPassword as resetPasswordApi,
} from '../../api/passwordResetApi';

function* passwordReset(
  action: ReturnType<typeof passwordResetRequest>
): Generator<any, void> {
  try {
    const response = yield call(
      passwordResetApi,
      action.payload.email,
      action.payload.captchaToken
    );
    yield put(passwordResetSuccess(response.data));
  } catch (error: any) {
    yield put(passwordResetFailure(error.response?.data));
  }
}

function* resetPassword(
  action: ReturnType<typeof resetPasswordRequest>
): Generator<any, void> {
  try {
    const response = yield call(
      resetPasswordApi,
      action.payload.token,
      action.payload.newPassword,
      action.payload.confirmPassword,
      action.payload.email
    );
    yield put(resetPasswordSuccess(response.data));
  } catch (error: any) {
    yield put(resetPasswordFailure(error.response?.data));
  }
}

export default function* authSaga() {
  yield takeLatest(passwordResetRequest.type, passwordReset);
  yield takeLatest(resetPasswordRequest.type, resetPassword);
}
