import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IProfileState {
    email: string;
    id?: string;
    name: string;
}

const initialState: IProfileState = {
    email: '',
    id: '',
    name: ''
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setTopProfileLink(state, action: PayloadAction<IProfileState>) {
            state.email = action.payload.email;
            state.name = action.payload.name;
        }
    }
})

export default profileSlice.reducer;