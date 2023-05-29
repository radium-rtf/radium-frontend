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
