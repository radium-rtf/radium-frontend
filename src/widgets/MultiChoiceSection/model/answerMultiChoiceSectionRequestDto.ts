export interface AnswerMultiChoiceSectionRequestDto {
  id: string;
  multiChoice: {
    answer: string[];
  };
}
