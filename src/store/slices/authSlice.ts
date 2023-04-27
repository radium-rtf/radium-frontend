import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
    email: string;
    isAuth?: boolean;
    accessToken: string;
}

const initialState: IAuthState = {
    email: localStorage.getItem('email') ?? '',
    isAuth: !!localStorage.getItem('token'),
    accessToken: localStorage.getItem('token') ?? ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<IAuthState>) {
            state.email = action.payload.email;
            state.isAuth = !!action.payload.accessToken;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('username', action.payload.email);
            localStorage.setItem('token', action.payload.accessToken);
        },
        logout(state) {
            state.email = '';
            state.accessToken = '';
            state.isAuth = false;
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        }
    }
})

export default authSlice.reducer;