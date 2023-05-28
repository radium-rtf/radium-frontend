import {AxiosError} from "axios";

export const ErrorService = {
    getErrorMessage: (error: AxiosError) => {
        if (error.response?.status) {
            console.log(error.response.data);
        }
    }
}