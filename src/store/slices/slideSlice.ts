import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISection } from "../../interfaces/slide.interface";

interface ISlideState {
    id?: number;
    name: string;
    nameEng: string;
    section: ISection[]
}

const initialState: ISlideState = {
    name: '',
    nameEng: '',
    section: []
}

export const slideSlice = createSlice({
    name: 'slide',
    initialState,
    reducers: {
        setSlide(state, action: PayloadAction<ISlideState>) {
            state.name = action.payload.name;
            state.nameEng = action.payload.nameEng;
            state.section = action.payload.section;
        }
    }
})

export default slideSlice.reducer;