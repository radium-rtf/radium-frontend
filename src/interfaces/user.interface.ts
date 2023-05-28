export interface IUser {
    email: string;
    password: string;
    username?: string;
}

export interface IProfile {
    email: string;
    password: string;
    username?: string;
    confirmPassword: string;
}