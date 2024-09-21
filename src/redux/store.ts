import { configureStore, Reducer } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { useDispatch } from 'react-redux';
import { createRootReducer } from './rootReducer';
import rootSaga from './rootSaga';

const asyncReducers: Record<string, Reducer> = {};
const asyncSagas: Record<string, Task> = {};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: createRootReducer(asyncReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: import.meta.env.MODE !== 'production',
});

sagaMiddleware.run(rootSaga);

export const injectReducer = (key: string, reducer: Reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer(asyncReducers));
  }
};

export const injectSaga = (key: string, saga: any) => {
  if (!asyncSagas[key]) {
    asyncSagas[key] = sagaMiddleware.run(saga);
  }
};

export const ejectSaga = (key: string) => {
  if (asyncSagas[key]) {
    asyncSagas[key].cancel();
    delete asyncSagas[key];
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
