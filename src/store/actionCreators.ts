import {AppDispatch} from "."
import axios from "../axios"
import {accessTokenType} from "../types/tokenType"
import {IUser} from "../interfaces/user.interface"
import {authSlice} from "./slices/authSlice"
import {AxiosError} from "axios";
import {ErrorService} from "../services/error.service";
import { ICardCourse } from "../interfaces/course.interface"
import {ICardCourseState, courseSlice} from "./slices/courseSlice"


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
            
            const course: ICardCourse = (await axios.get<ICardCourse>(`course/${id}`)).data;
            
            console.log(course);

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}