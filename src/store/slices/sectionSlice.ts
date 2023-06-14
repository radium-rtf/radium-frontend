import { Section } from "../../interfaces/module.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISectionState {
    section: Section;
}

const initialState: ISectionState = {
    section: {} as Section
}

export const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        setSection(state, action: PayloadAction<Section>) {
            state.section = action.payload;
        }
    }
})

export default sectionSlice.reducer;