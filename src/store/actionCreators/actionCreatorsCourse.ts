import { AxiosError } from 'axios';
import { ICardCourse, ICourse } from '../../interfaces/course.interface';
import { courseSlice } from '../slices/courseSlice';
import { AppDispatch } from './../index';
import { ErrorService } from '../../services/error.service';
import axios from '../../axios';
import { IModuleCourse } from '../../interfaces/module.interface';
import { moduleSlice } from '../slices/moduleSlice';
import { ISlide } from '../../interfaces/slide.interface';
import { slideSlice } from '../slices/slideSlice';

export const getCourses = (token: string) => {
    console.log(token);

    return async (dispatch: AppDispatch) => {
        try {
            dispatch(courseSlice.actions.coursesFetching());

            const courses: ICardCourse[] = (await axios.get<ICardCourse[]>('course', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            dispatch(courseSlice.actions.setCourses(courses))
        } catch (error) {
            dispatch(courseSlice.actions.setError(ErrorService.getErrorMessage(error as AxiosError) as AxiosError));
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
            dispatch(courseSlice.actions.setError(ErrorService.getErrorMessage(error as AxiosError) as AxiosError));
        }
    }
}

export const getCourseModule = (token: string, id: number = 2) => {
    return async (dispatch: AppDispatch) => {
        try {
            const moduleByCourse: IModuleCourse = (await axios.get<IModuleCourse>(`module/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            dispatch(moduleSlice.actions.setModuleCourse({ moduleCourse: { ...moduleByCourse } }));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const getSlideById = (slideId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const slide: ISlide = (await axios.get<ISlide>(`slide/${slideId + 1}`)).data;

            console.log(slide);
            dispatch(slideSlice.actions.setSlide(slide));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }

    }
}