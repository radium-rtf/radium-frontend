import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
    isAuth?: boolean;
    accessToken: string;
}

const initialState: IAuthState = {
    isAuth: !!localStorage.getItem('token'),
    accessToken: localStorage.getItem('token') ?? ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<IAuthState>) {
            state.accessToken = action.payload.accessToken;
            state.isAuth = !!action.payload.accessToken;
            localStorage.setItem('token', state.accessToken);
        },
        logout(state) {
            state.accessToken = '';
            state.isAuth = false;
            localStorage.removeItem('token');
        }
    }
});

export default authSlice.reducer;