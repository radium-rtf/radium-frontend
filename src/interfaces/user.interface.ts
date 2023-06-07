export interface IUser {
    email: string;
    password?: string;
    name: string;
    id?: string;
}

export interface IProfile {
    email: string;
    password: string;
    username?: string;
    confirmPassword: string;
}

export interface User {
    id: string
    name: string
    avatar: string
    email: string
}