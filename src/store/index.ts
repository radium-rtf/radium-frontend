import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
})

export const storeConfig = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof storeConfig;
export type AppDispatch = typeof storeConfig.dispatch;