import {Module} from "./module.interface";

export interface Course {
    id: string
    name: string
    slug: string

    logo: string
    shortDescription: string

    banner: string
    description: string

    authors: Author[]
    links: Link[]
    modules: Module[]
}

export interface Author {
    id: string
    name: string
    avatar: string
    email: string
}

export interface Link {
    id: string
    courseId: string
    name: string
    link: string
}

export interface ICardCourse {
    name: string,
    description: string,
    authorId?: string,
    logo: string,
    id?: number,
    type?: string
}

export interface ICourse {
    author: IAuthor;
    collaborators?: ICollaborator;
    links?: ILink;
    description: string;
    logo: string;
    name: string;
    type?: string;
    id?: number; 
}

interface IAuthor {
    email: string;
    id: string;
    name: string;
}

interface ICollaborator {
    email: string;
    id: string;
    name: string;
}

interface ILink {
    link: string;
    name: string;
}