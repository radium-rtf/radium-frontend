import { AxiosError } from "axios"
import { AppDispatch } from "."
import axios from "../axios"
import { ICardCourse, ICourse } from "../interfaces/course.interface"
import { IUser } from "../interfaces/user.interface"
import { ErrorService } from "../services/error.service"
import { accessTokenType } from "../types/tokenType"
import { authSlice } from "./slices/authSlice"
import { courseSlice } from "./slices/courseSlice"


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
            ErrorService.getErrorMessage(error as AxiosError);
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
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const getCourses = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const courses: ICardCourse[] = (await axios.get<ICardCourse[]>('course')).data;

            dispatch(courseSlice.actions.setCourses(courses))
        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const getCourse = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const course: ICourse = (await axios.get<ICourse>(`course/${id}`)).data;

            dispatch(courseSlice.actions.setCourse(course));
        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}