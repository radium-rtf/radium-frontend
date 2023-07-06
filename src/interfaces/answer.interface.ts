export interface IAnswer {
    choice?: IChoice;
    multiChoice?: IMultiChoice;
    shortAnswer?: IShortAnswer;
}

export interface IChoice {
    answer: string;
    id?: string;
}

export interface IMultiChoice {
    answer: string[];
    id?: string
}

export interface IShortAnswer {
    answer: string;
    id?: string;
}