import { configureStore, Reducer } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createRootReducer } from './root/rootReducer';
import rootSaga from './root/rootSaga';
import persistConfig from './persistConfig';

export const sagaMiddleware = createSagaMiddleware();

const rootReducer = createRootReducer();
const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: import.meta.env.MODE !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
