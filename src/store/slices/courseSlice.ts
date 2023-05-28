import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { ICardCourse } from "../../interfaces/course.interface";

export interface ICardCourseState {
    courses: ICardCourse[]
}

const initialState: ICardCourseState = {
    courses: []
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<ICardCourse[]>) {
            state.courses = action.payload;
        }
    }
})

export default courseSlice.reducer;