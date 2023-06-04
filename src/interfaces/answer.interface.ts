// IChoiceAnswer - ответ на задание с вариантом ответа
export interface IChoiceAnswer {
    answer: string;
    sectionId: string;
}

// IMultiChoiceAnswer - ответ на задание с несколькими вариантами ответа
export interface IMultiChoiceAnswer {
    answer: string[];
    sectionId: string;
}

// IQuestionAnswer - ответ на вопрос
export interface IQuestionAnswer {
    answer: string;
    sectionId: string;
}