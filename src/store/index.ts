import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import profileReducer from './slices/profileSlice';
import moduleReducer from './slices/moduleSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    profile: profileReducer,
    module: moduleReducer
})

export const storeConfig = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof storeConfig;
export type AppDispatch = typeof storeConfig.dispatch;