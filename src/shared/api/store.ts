import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { emptyApi } from './api';

export const store = configureStore({
  reducer: {
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptyApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const { dispatch } = store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
