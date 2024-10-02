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
  checkAuthStatus,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from './authSlice';
import {
  loginUser,
  logoutUser,
  checkAuthStatus as checkAuthStatusApi,
  forgotPassword,
  resetPassword,
} from '../api/authApi';

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void> {
  try {
    const response = yield call(loginUser, action.payload);
    yield put(loginSuccess(response.data.data.user));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || 'Login failed'));
  }
}

function* handleLogout() {
  try {
    yield call(logoutUser);
    yield call([localStorage, 'clear']);
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutFailure(error.response?.data?.message || 'Logout failed'));
  }
}

function* handleCheckAuthStatus(): Generator<any, void> {
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

function* handleForgotPassword(
  action: ReturnType<typeof forgotPasswordRequest>
): Generator<any, void> {
  try {
    yield call(
      forgotPassword,
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

function* handlePasswordUpdate(
  action: ReturnType<typeof resetPasswordRequest>
): Generator<any, void> {
  try {
    yield call(
      resetPassword,
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
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkAuthStatus.type, handleCheckAuthStatus);
  yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
  yield takeLatest(resetPasswordRequest.type, handlePasswordUpdate);
}
