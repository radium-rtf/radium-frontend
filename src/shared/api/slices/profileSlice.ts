import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IProfileState {
    email: string;
    id?: string;
    name: string;
    avatar?: string;
}

const initialState: IProfileState = {
    email: '',
    id: '',
    name: '',
    avatar: ''
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setTopProfileLink(state, action: PayloadAction<IProfileState>) {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
        }
    }
})

export default profileSlice.reducer;