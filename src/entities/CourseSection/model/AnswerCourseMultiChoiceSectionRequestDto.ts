export interface AnswerCourseMultiChoiceSectionRequestDto {
  id: string;
  multiChoice: {
    answer: string[];
  };
}
