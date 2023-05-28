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