import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { ICardCourse, ICourse } from "../../interfaces/course.interface";
import { AxiosError } from "axios";

export interface ICardCourseState {
    courses: ICardCourse[],
    course: ICourse,
    isLoading?: boolean,
    error?: AxiosError
}

const initialState: ICardCourseState = {
    courses: [],
    course: {} as ICourse,
    error: {} as AxiosError,
    isLoading: false
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<ICardCourse[]>) {
            state.courses = action.payload;
            state.isLoading = false;
        },
        setCourse(state, action: PayloadAction<ICourse>) {
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