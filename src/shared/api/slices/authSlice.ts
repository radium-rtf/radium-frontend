import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const _tokenKey: string = 'token';

export interface IAuthState {
    isAuth?: boolean;
    accessToken: string;
}

const initialState: IAuthState = {
    isAuth: !!localStorage.getItem(_tokenKey),
    accessToken: localStorage.getItem(_tokenKey) ?? ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<IAuthState>) {
            state.accessToken = action.payload.accessToken;
            state.isAuth = !!action.payload.accessToken;
            localStorage.setItem(_tokenKey, state.accessToken);
        },
        logout(state) {
            state.accessToken = '';
            state.isAuth = false;
            localStorage.removeItem(_tokenKey);
        }
    }
});

export default authSlice.reducer;