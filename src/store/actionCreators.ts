import { AppDispatch } from "."
import axios from "../axios"
import { IUser } from "../types/user.interface"
import { IAuthState, authSlice } from "./slices/authSlice"

export const login = (data: IUser) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get<IAuthState>('');
        try {
            dispatch(authSlice.actions.loginSuccess(response.data));
        } catch (error) {
            console.log((error as Error).message);
        }
    }
}

export const register = (data: IUser) => {
    return async (dispatch: AppDispatch) => {
        const response = await axios.get<IAuthState>('');
        try {
            dispatch(authSlice.actions.loginSuccess(response.data));
        } catch (error) {
            console.log((error as Error).message);
        }
    }
}