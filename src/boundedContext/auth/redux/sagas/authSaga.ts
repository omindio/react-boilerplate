import { call, put, takeLatest } from 'redux-saga/effects';
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
} from '../reducers/authSlice';
import {
  login as loginApi,
  logout as logoutApi,
  checkAuthStatus as checkAuthStatusApi,
} from '../../api/authApi';

function* login(action: ReturnType<typeof loginRequest>): Generator<any, void> {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response.data.data));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data));
  }
}

function* logout(): Generator<any, void> {
  try {
    const response = yield call(logoutApi);
    yield call([localStorage, 'clear']);
    yield put(logoutSuccess(response.data));
  } catch (error: any) {
    yield put(logoutFailure(error.response?.data));
  }
}

function* checkAuthStatus(): Generator<any, void> {
  try {
    const response = yield call(checkAuthStatusApi);

    yield put(checkAuthStatusSuccess(response.data.data));
  } catch (error: any) {
    yield put(checkAuthStatusFailure(error.response?.data));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(logoutRequest.type, logout);
  yield takeLatest(checkAuthStatusRequest.type, checkAuthStatus);
}
