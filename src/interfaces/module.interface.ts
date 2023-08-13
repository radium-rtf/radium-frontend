export interface Module {
    id: string
    name: string
    slug: string
    pages: Page[]
}

export interface IStatementUser {
    id?: string;
    title: string;
    slug?: string;
    avatar?: string;
    description?: string;
}

export interface Page {
    id?: string
    maxScore?: number;
    name: string
    slug: string
    sections: Section[]
    order?: number;
    score?: number;
}

export interface Section {
    answer?: string;
    answers?: string[];
    content: string;
    id?: string;
    maxScore?: number;
    order?: number;
    pageId?: string;
    score?: number;
    type?: string;
    variants: string[];
    verdict?: string;
}

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

