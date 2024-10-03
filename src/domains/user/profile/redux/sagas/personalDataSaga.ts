import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPersonalDataRequest,
  fetchPersonalDataSuccess,
  fetchPersonalDataFailure,
  updatePersonalDataRequest,
  updatePersonalDataSuccess,
  updatePersonalDataFailure,
} from '../reducers/personalDataSlice';
import {
  fetchPersonalData as fetchPersonalDataApi,
  updatePersonalData as updatePersonalDataApi,
} from '../../api/profileApi';

function* fetchPersonalData(): Generator<any, void> {
  try {
    const response = yield call(fetchPersonalDataApi);
    yield put(fetchPersonalDataSuccess(response.data));
  } catch (error: any) {
    yield put(fetchPersonalDataFailure(error.response?.data?.message));
  }
}

function* updatePersonalData(
  action: ReturnType<typeof updatePersonalDataRequest>
): Generator<any, void> {
  try {
    const response = yield call(updatePersonalDataApi, action.payload);
    yield put(updatePersonalDataSuccess(response.data));
  } catch (error: any) {
    yield put(updatePersonalDataFailure(error.response?.data?.message));
  }
}

export default function* personalDataWatcherSaga() {
  yield takeLatest(fetchPersonalDataRequest.type, fetchPersonalData);
  yield takeLatest(updatePersonalDataRequest.type, updatePersonalData);
}
