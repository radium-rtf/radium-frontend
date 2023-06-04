import {AxiosError} from "axios";

export const ErrorService = {
    getErrorMessage: (error: AxiosError) => {
        if (error.response?.status) {
            return error.response.data;
        }
    }
}