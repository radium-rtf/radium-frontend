export interface ITableStatement {
    name: string;
    courses: IStatementCourse[];
}

export interface IStatementCourse {
    course: string;
    score: number;
}