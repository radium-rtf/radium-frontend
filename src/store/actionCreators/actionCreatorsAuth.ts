import { AxiosError } from "axios"
import { AppDispatch } from ".."
import axios from "../../axios"
import { IUser } from "../../interfaces/user.interface"
import { ErrorService } from "../../services/error.service"
import { accessTokenType } from "../../types/tokenType"
import { authSlice } from "../slices/authSlice"
import { profileSlice } from "../slices/profileSlice"


export const login = (user: IUser) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token: accessTokenType = (await axios.post<accessTokenType>('auth/signIn', user)).data;

            dispatch(authSlice.actions.loginSuccess({
                accessToken: token.accessToken,
                isAuth: !!token.accessToken,
                ...user
            }));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const registration = (user: IUser) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token: accessTokenType = (await axios.post<accessTokenType>('auth/signUp', user)).data;

            dispatch(authSlice.actions.loginSuccess({
                accessToken: token.accessToken,
                isAuth: !!token,
                ...user
            }));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const fetchUser = (token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const user: IUser = (await axios.get<IUser>('account', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;
           
            dispatch(profileSlice.actions.setTopProfileLink(user));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

