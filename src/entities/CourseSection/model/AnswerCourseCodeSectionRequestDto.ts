export interface AnswerCourseCodeSectionRequestDto {
  id: string;
  code: {
    answer: string;
    lang: string;
  };
}
