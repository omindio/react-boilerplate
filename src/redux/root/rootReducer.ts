import { combineReducers } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import authReducer from '@domains/auth/redux/reducers/authSlice';

export const staticReducers = {
  auth: authReducer,
};

export function createRootReducer(
  dynamicReducers: { [key: string]: Reducer } = {}
) {
  return combineReducers({
    ...staticReducers,
    ...dynamicReducers,
  });
}
