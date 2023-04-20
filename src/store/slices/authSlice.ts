import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.interface";

export interface IAuthState {
    user: IUser;
    isAuth?: boolean;
}

const initialState: IAuthState = {
    user: {} as IUser,
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<IAuthState>) {
            state.user.email = action.payload.user.email;
            state.user.password = action.payload.user.password;
            state.user.username = action.payload.user.username;
            state.user.name = action.payload.user.name;
            state.isAuth = true;
            localStorage.setItem('username', state.user.username);
        },
        logout(state) {
            state.user.email = '';
            state.user.password = '';
            state.user.username = '';
            state.user.name = '';
            state.isAuth = false;
            localStorage.clear();
        }
    }
})

export default authSlice.reducer;