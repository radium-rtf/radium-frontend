import { AxiosError } from "axios"
import { AppDispatch } from ".."
import axios from "../../axios"
import { ICardCourse, ICourse } from "../../interfaces/course.interface"
import { IUser } from "../../interfaces/user.interface"
import { ErrorService } from "../../services/error.service"
import { accessTokenType } from "../../types/tokenType"
import { authSlice } from "../slices/authSlice"
import { courseSlice } from "../slices/courseSlice"
import { profileSlice } from "../slices/profileSlice"
import { IModule, IModuleCourse } from "../../interfaces/module.interface"
import { moduleSlice } from "../slices/moduleSlice"


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

// TODO - получать user
export const fetchUser = (token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const user: IUser = (await axios.get<IUser>('account', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            console.log(user.email);
            dispatch(profileSlice.actions.setTopProfileLink(user));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const getCourses = (token: string) => {
    console.log(token);

    return async (dispatch: AppDispatch) => {
        try {
            const courses: ICardCourse[] = (await axios.get<ICardCourse[]>('course', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            dispatch(courseSlice.actions.setCourses(courses))
        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const getCourse = (id: number, token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const course: ICourse = (await axios.get<ICourse>(`course/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            dispatch(courseSlice.actions.setCourse(course));
        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const getCourseModule = (token: string, id: number = 2) => {
    return async (dispath: AppDispatch) => {
        try {
            const moduleByCourse: IModuleCourse = (await axios.get<IModuleCourse>(`module/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            dispath(moduleSlice.actions.setModuleCourse({ moduleCourse: { ...moduleByCourse } }));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}