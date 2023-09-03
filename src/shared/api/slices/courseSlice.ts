import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { Course, ICardCourse, ICourse } from "../../../interfaces/course.interface";
import { AxiosError } from "axios";

export interface ICardCourseState {
    courses: Course[],
    course: Course,
    isLoading?: boolean,
    error?: AxiosError
}

const initialState: ICardCourseState = {
    courses: [],
    course: {} as Course,
    error: {} as AxiosError,
    isLoading: false
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<Course[]>) {
            state.courses = action.payload;
            state.isLoading = false;
        },
        setCourse(state, action: PayloadAction<Course>) {
            state.course = action.payload;
        },
        coursesFetching(state) {
            state.isLoading = true;
        },
        setError(state, action: PayloadAction<AxiosError>) {
            state.error = action.payload;
        }
    }
})

export default courseSlice.reducer;