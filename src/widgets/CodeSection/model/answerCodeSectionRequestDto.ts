export interface AnswerCodeSectionRequestDto {
  id: string;
  code: {
    answer: string;
    lang: string;
  };
}
