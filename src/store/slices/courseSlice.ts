import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { ICardCourse, ICourse } from "../../interfaces/course.interface";

export interface ICardCourseState {
    courses: ICardCourse[],
    course: ICourse
}

const initialState: ICardCourseState = {
    courses: [],
    course: {} as ICourse
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<ICardCourse[]>) {
            state.courses = action.payload;
        },
        setCourse(state, action: PayloadAction<ICourse>) {
            state.course = action.payload;
        }
    }
})

export default courseSlice.reducer;