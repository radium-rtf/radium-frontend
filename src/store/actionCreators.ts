import { AppDispatch } from "."
import axios from "../axios"
import { accessTokenType } from "../types/tokenType"
import { IUser } from "../types/user.interface"
import { authSlice } from "./slices/authSlice"


export const login = (user: IUser) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token: accessTokenType = (await axios.post<accessTokenType>('auth/signIn', user)).data;

            dispatch(authSlice.actions.loginSuccess({
                accessToken: token.access_token,
                isAuth: !!token,
                ...user
            }));

        } catch (error) {
            console.log((error as Error).message);
        }
    }
}

export const registration = (user: IUser) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token: accessTokenType = (await axios.post<accessTokenType>('auth/signUp', user)).data;

            dispatch(authSlice.actions.loginSuccess({
                accessToken: token.access_token,
                isAuth: !!token,
                ...user
            }));

        } catch (error) {
            console.log((error as Error).message);
        }
    }
}

// export const fetchUserAccount = (token: string) => {
//     return async (dispatch: AppDispatch) => {
//         try {

//         } catch {

//         }
//     }
// }