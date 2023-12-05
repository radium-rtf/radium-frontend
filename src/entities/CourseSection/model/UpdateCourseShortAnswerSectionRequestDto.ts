export interface UpdateCourseShortAnswerSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  shortanswer: {
    answer: string;
    question: string;
  };
}
