import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import profileReducer from './slices/profileSlice';
import moduleReducer from './slices/moduleSlice';
import pageReducer from './slices/pageSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    profile: profileReducer,
    module: moduleReducer,
    page: pageReducer,
})

export const storeConfig = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof storeConfig;
export type AppDispatch = typeof storeConfig.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;