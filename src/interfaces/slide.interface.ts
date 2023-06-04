export interface ISlide {
    id?: number;
    name: string;
    nameEng: string;
    section: ISection[]
};

export interface ISection {
    answer: string;
    caseSensitive?: boolean;
    cost?: number;
    id?: number;
    orderBy?: number;
    question: string;
    slideId?: number
}