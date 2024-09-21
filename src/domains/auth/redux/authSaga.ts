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
  checkAuthStatus,
} from './authSlice';
import {
  loginUser,
  logoutUser,
  checkAuthStatus as checkAuthStatusApi,
} from '../api/authApi';

//TODO: Comprobar los payloads de las acciones y la gestion de errores
//TODO: Redirigir al dashboard despues del login
function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void> {
  try {
    const response = yield call(loginUser, action.payload);
    yield put(loginSuccess(response.data));
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
    yield put(checkAuthStatusSuccess(response.data));
  } catch (error: any) {
    yield put(
      checkAuthStatusFailure(error.message || 'Failed to check auth status')
    ); // En caso de error
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkAuthStatus.type, handleCheckAuthStatus);
}
