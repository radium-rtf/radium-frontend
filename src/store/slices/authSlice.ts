import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
    isAuth?: boolean;
    accessToken: string;
}

const initialState: IAuthState = {
    isAuth: !!localStorage.getItem('token'),
    accessToken: localStorage.getItem('token') ?? '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<IAuthState>) {
            state.isAuth = !!action.payload.accessToken;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('token', action.payload.accessToken);
        },
        logout(state) {
            state.accessToken = '';
            state.isAuth = false;
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        }
    }
});

export default authSlice.reducer;