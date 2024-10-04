import { Reducer } from '@reduxjs/toolkit';
import { Task } from 'redux-saga';
import { store, sagaMiddleware } from './store';
import { createRootReducer } from './root/rootReducer';

const asyncReducers: Record<string, Reducer> = {};
const asyncSagas: Record<string, Task> = {};

export const injectReducer = (key: string, reducer: Reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer(asyncReducers)); // Aquí se reemplace el rootReducer
  }
};

export const ejectReducer = (key: string) => {
  if (asyncReducers[key]) {
    delete asyncReducers[key];
    store.replaceReducer(createRootReducer(asyncReducers));
  }
};

export const injectSaga = (key: string, saga: any) => {
  if (!asyncSagas[key]) {
    const sagaTask = sagaMiddleware.run(saga);
    asyncSagas[key] = sagaTask;
    return sagaTask;
  }
  return asyncSagas[key];
};

export const ejectSaga = (key: string) => {
  if (asyncSagas[key]) {
    asyncSagas[key].cancel();
    delete asyncSagas[key];
  }
};
