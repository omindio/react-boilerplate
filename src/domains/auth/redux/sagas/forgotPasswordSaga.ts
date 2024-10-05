import { call, put, takeLatest } from 'redux-saga/effects';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../reducers/forgotPasswordSlice';
import {
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from '../../api/forgotPasswordApi';

function* forgotPassword(
  action: ReturnType<typeof forgotPasswordRequest>
): Generator<any, void> {
  try {
    const response = yield call(
      forgotPasswordApi,
      action.payload.email,
      action.payload.captchaToken
    );
    yield put(forgotPasswordSuccess(response.data));
  } catch (error: any) {
    yield put(forgotPasswordFailure(error.response?.data));
  }
}

function* resetPassword(
  action: ReturnType<typeof resetPasswordRequest>
): Generator<any, void> {
  try {
    const response = yield call(
      resetPasswordApi,
      action.payload.token,
      action.payload.password,
      action.payload.passwordConfirmation,
      action.payload.email
    );
    yield put(resetPasswordSuccess(response.data));
  } catch (error: any) {
    yield put(resetPasswordFailure(error.response?.data));
  }
}

export default function* authSaga() {
  yield takeLatest(forgotPasswordRequest.type, forgotPassword);
  yield takeLatest(resetPasswordRequest.type, resetPassword);
}
