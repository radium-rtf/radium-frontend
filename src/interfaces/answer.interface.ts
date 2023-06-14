export interface IAnswer {
    choice: IChoice;
    multiChoice: IMultiChoice;
    shortAnswer: IShortAnswer;
}

interface IChoice {
    answer: string;
    id?: string;
}

interface IMultiChoice {
    answer: string[];
    id?: string
}

interface IShortAnswer {
    answer: string;
    id?: string;
}