export interface CourseReportDto {
    header: Header;
    rows: Row[];
}

export interface Header {
    maxScore: number;
    values: Value[];
}

export interface Value {
    isModule: boolean;
    maxScore: number;
    name: string;
}

export interface Row {
    score: number;
    user: User;
    values: number[];
}

export interface User {
    avatar: string;
    email: string;
    id: string;
    name: string;
    roles: string[];
}
