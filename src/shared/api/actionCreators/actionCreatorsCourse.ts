import { AxiosError } from 'axios';
import axios from '../axios';
import { IAnswer } from "../../../interfaces/answer.interface";
import { Course } from '../../../interfaces/course.interface';
import { IModuleCourse, Page, Section } from '../../../interfaces/module.interface';
import { ErrorService } from '../../../services/error.service';
import { courseSlice } from '@/shared/api/slices/courseSlice';
import { moduleSlice } from '@/shared/api/slices/moduleSlice';
import { pageSlice } from "@/shared/api/slices/pageSlice";
import { AppDispatch } from '../store';

export const getCourses = (token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(courseSlice.actions.coursesFetching());

            const courses: Course[] = (await axios.get<Course[]>('course', {
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

export const getCourse = (id: string, token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const course: Course = (await axios.get<Course>(`course/97efdf12-f524-4f4f-875b-5a9ca1e633be`, {
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

export const getPage = (token: string, pageId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const page: Page = (await axios.get<Page>(`page/${pageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data;

            dispatch(pageSlice.actions.setPage(page));

        } catch(error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}

export const addAnswer = (token: string, answer: IAnswer) => {
    return async (dispatch: AppDispatch) => {
        try {
            const section: Section = await axios.post('answer', answer, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(pageSlice.actions.setSection(section));

        } catch (error) {
            ErrorService.getErrorMessage(error as AxiosError);
        }
    }
}