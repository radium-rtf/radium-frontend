export interface UpdateCourseAnswerSectionRequestDto {
  sectionId: string;
  maxAttempts: number;
  maxScore: number;
  answer: {
    question: string;
  };
}
