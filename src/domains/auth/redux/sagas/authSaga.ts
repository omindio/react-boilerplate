import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  checkAuthStatusSuccess,
  checkAuthStatusFailure,
  checkAuthStatusRequest,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../reducers/authSlice';
import {
  login as loginApi,
  logout as logoutApi,
  checkAuthStatus as checkAuthStatusApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from '../../api/authApi';

function* login(action: ReturnType<typeof loginRequest>): Generator<any, void> {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response.data.data.user));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || 'Login failed'));
  }
}

function* logout() {
  try {
    yield call(logoutApi);
    yield call([localStorage, 'clear']);
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutFailure(error.response?.data?.message || 'Logout failed'));
  }
}

function* checkAuthStatus(): Generator<any, void> {
  try {
    const response = yield call(checkAuthStatusApi);

    yield put(checkAuthStatusSuccess(response.data.data.user));
  } catch (error: any) {
    yield put(
      checkAuthStatusFailure(
        error.response?.data?.message || 'Failed to check auth status'
      )
    );
  }
}

function* forgotPassword(
  action: ReturnType<typeof forgotPasswordRequest>
): Generator<any, void> {
  try {
    yield call(
      forgotPasswordApi,
      action.payload.email,
      action.payload.captchaToken
    );
    yield put(forgotPasswordSuccess());
  } catch (error: any) {
    yield put(
      forgotPasswordFailure(
        error.response?.data?.message || 'Password recovery failed'
      )
    );
  }
}

function* resetPassword(
  action: ReturnType<typeof resetPasswordRequest>
): Generator<any, void> {
  try {
    yield call(
      resetPasswordApi,
      action.payload.token,
      action.payload.password,
      action.payload.passwordConfirmation,
      action.payload.email
    );
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    yield put(
      resetPasswordFailure(
        error.response?.data?.message || 'Password update failed'
      )
    );
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(logoutRequest.type, logout);
  yield takeLatest(checkAuthStatusRequest.type, checkAuthStatus);
  yield takeLatest(forgotPasswordRequest.type, forgotPassword);
  yield takeLatest(resetPasswordRequest.type, resetPassword);
}
