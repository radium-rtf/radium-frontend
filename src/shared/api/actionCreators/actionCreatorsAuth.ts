import { AxiosError } from "axios"
import axios from "../axios"
import { IUser } from "../../../interfaces/user.interface"
import { ErrorService } from "../../../services/error.service"
import { accessTokenType } from "../../../types/tokenType"
import { authSlice } from "@/shared/api/slices/authSlice"
import { profileSlice } from "@/shared/api/slices/profileSlice"
import {AppDispatch} from "@/shared/api/store";


export const login = (user: IUser) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token: accessTokenType = (await axios.post<accessTokenType>('auth/signIn', user)).data;

            dispatch(authSlice.actions.loginSuccess({
                accessToken: token.accessToken,
                isAuth: !!token.accessToken
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
                isAuth: !!token.accessToken
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

export const updateProfileUser = (token: string, name: string, avatar: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const user: IUser = (await axios.patch<IUser>('account', { name, avatar }, {
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

export const updatePassword = (currentPassword: string, newPassword: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token: string = (await axios.patch<string>('', {current: currentPassword, new: newPassword})).data;

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}
