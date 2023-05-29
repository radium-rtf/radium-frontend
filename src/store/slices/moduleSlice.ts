import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IModule, IModuleCourse } from "../../interfaces/module.interface";

interface IModuleState {
    moduleCourse: IModuleCourse,
}

const initialState: IModuleState = {
    moduleCourse: {} as IModuleCourse,
}

export const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setModuleCourse(state, action: PayloadAction<IModuleState>) {
            state.moduleCourse = action.payload.moduleCourse;
        }
    }
})

export default moduleSlice.reducer;

