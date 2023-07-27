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
    description: string;
}

export interface Page {
    id?: string
    name: string
    slug: string
    sections: Section[]
}

export interface Section {
    id: string
    pageId: string
    order: number
    text?: {
        content: string
    }
    shortanswer?: {
        question: string
        maxScore: number
        score: number
    }
    choice?: {
        question: string
        maxScore: number
        score: number
        variants: string[]
    }
    multichoice?: {
        question: string
        maxScore: number
        score: number
        variants: string[]
    }
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

