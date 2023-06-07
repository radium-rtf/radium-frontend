export interface Module {
    name: string
    slug: string
    pages: Page[]
}

export interface Page {
    id: string
    name: string
    slug: string
    sections: Section[]
}

export interface Section {
    id: string
    pageId: string
    order: number
    text?: {
        id: string
        content: string
    }
    shortanswer?: {
        id: string
        question: string
        maxScore: number
    }
    choice?: {
        id: string
        question: string
        maxScore: number
        variants: string[]
    }
    multichoice?: {
        id: string
        question: string
        maxScore: number
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

