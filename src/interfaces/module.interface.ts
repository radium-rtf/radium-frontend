export interface IModuleCourse {
    id: number;
    logo: string;
    modules: IModule[];
    name: string;
}

export interface IModule {
    name: string;
    nameEng: string;
}

