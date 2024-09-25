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
  passwordRecoveryRequest,
  passwordRecoverySuccess,
  passwordRecoveryFailure,
  passwordUpdateRequest,
  passwordUpdateSuccess,
  passwordUpdateFailure,
} from './authSlice';
import {
  loginUser,
  logoutUser,
  checkAuthStatus as checkAuthStatusApi,
  requestPasswordRecovery,
  updatePassword,
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

function* handlePasswordRecovery(
  action: ReturnType<typeof passwordRecoveryRequest>
): Generator<any, void> {
  try {
    yield call(requestPasswordRecovery, action.payload.email);
    yield put(passwordRecoverySuccess());
  } catch (error: any) {
    yield put(
      passwordRecoveryFailure(
        error.response?.data?.message || 'Password recovery failed'
      )
    );
  }
}

function* handlePasswordUpdate(
  action: ReturnType<typeof passwordUpdateRequest>
): Generator<any, void> {
  try {
    yield call(
      updatePassword,
      action.payload.token,
      action.payload.newPassword
    );
    yield put(passwordUpdateSuccess());
  } catch (error: any) {
    yield put(
      passwordUpdateFailure(
        error.response?.data?.message || 'Password update failed'
      )
    );
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkAuthStatus.type, handleCheckAuthStatus);
  yield takeLatest(passwordRecoveryRequest.type, handlePasswordRecovery);
  yield takeLatest(passwordUpdateRequest.type, handlePasswordUpdate);
}
