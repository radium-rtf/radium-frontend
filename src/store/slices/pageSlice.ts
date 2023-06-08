import { Section } from "../../interfaces/module.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPageState {
    id?: string
    name: string
    slug?: string
    sections: Section[]
}

const initialState: IPageState = {
    id: '',
    name: '',
    slug: '',
    sections: []
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<IPageState>) {
            state.name = action.payload.name;
            state.slug = action.payload.slug;
            state.sections = action.payload.sections;
        }
    }
})

export default pageSlice.reducer;