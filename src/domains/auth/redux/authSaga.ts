import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from './authSlice';
import { loginUser, logoutUser } from '../api/authApi';

function* handleLogin(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  try {
    const response = yield call(loginUser, action.payload);
    const { user, token } = response.data;
    yield put(loginSuccess({ user, token }));
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

// Watcher Saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}