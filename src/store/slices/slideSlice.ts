import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISection } from "../../interfaces/slide.interface";


// TODO - приходит массив массивов после запроса -> sections[0] -> sections[0] -> section.question
// править бэк либо стейт фронта

interface ISlideState {
    id?: number;
    name: string;
    nameEng: string;
    sections: ISection[]
}

const initialState: ISlideState = {
    name: '',
    nameEng: '',
    sections: []
}

export const slideSlice = createSlice({
    name: 'slide',
    initialState,
    reducers: {
        setSlide(state, action: PayloadAction<ISlideState>) {
            state.name = action.payload.name;
            state.nameEng = action.payload.nameEng;
            state.sections = action.payload.sections;
        }
    }
})

export default slideSlice.reducer;